import {
  call,
  put,
  all,
  takeEvery,
  takeLatest,
  take,
  race
} from 'redux-saga/effects'

import {
  FETCH_AVAILABLE,
  SET_AVAILABLE,
  START_CYREST_POLLING,
  STOP_CYREST_POLLING
} from '../actions/cyrest'

import * as cyrest from '../api/cyrest'

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}

function* fetchCyRESTAvailable(action) {
  while (true) {
    try {
      const { data } = yield call(cyrest.status, 1234)
      yield put({ type: SET_AVAILABLE, payload: true })
    } catch (e) {
      yield put({ type: SET_AVAILABLE, payload: false })
    }
    yield call(delay, 5000)
  }
}

function* cyRestStatusSaga() {
  while (true) {
    console.log('in cyRestStatusSaga loop')
    const data = yield take(START_CYREST_POLLING)
    yield race([call(fetchCyRESTAvailable, data), take(STOP_CYREST_POLLING)])
  }
}

export default function* root() {
  console.log('in cyRestStatusSaga root')
  yield all([cyRestStatusSaga()])
}
