import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from '../api/ndex'

import {
  SEARCH_STARTED,
  SEARCH_FAILED,
  SEARCH_SUCCEEDED
} from '../actions/search'

export default function* rootSaga() {
  console.log('rootSaga reporting for duty')
  yield takeLatest(SEARCH_STARTED, watchSearch)
}

function* watchSearch() {
  try {
    console.log('---Calling-----')
    const { results } = yield call(param => api.searchNetwork(param))
    yield put({
      type: SEARCH_SUCCEEDED,
      payload: { results }
    })
  } catch (e) {
    yield put({
      type: SEARCH_FAILED,
      payload: { error: e.message }
    })
  }
}
