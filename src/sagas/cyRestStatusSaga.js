import { call, put, all, take, race } from 'redux-saga/effects'

import {
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

export function* _fetchCyRESTAvailable(action) {
  while (true) {
    try {
      const statusResponse = yield call(cyrest.status, 1234)
      console.log(statusResponse)
      const statusJson = yield call([statusResponse, 'json'])
      console.log('_fetchCyRESTAvailable json:', statusJson)
      yield put({ type: SET_AVAILABLE, payload: true })
    } catch (e) {
      console.log('_fetchCyRESTAvailable failed')
      console.log(e)
      yield put({ type: SET_AVAILABLE, payload: false })
    }
    yield call(delay, 5000)
  }
}

export function* _cyRestStatusSaga() {
  while (true) {
    console.log('in cyRestStatusSaga loop')
    const data = yield take(START_CYREST_POLLING)
    yield race([call(_fetchCyRESTAvailable), take(STOP_CYREST_POLLING)])
  }
}

export default function* root() {
  console.log('in cyRestStatusSaga root')
  yield all([_cyRestStatusSaga()])
}
