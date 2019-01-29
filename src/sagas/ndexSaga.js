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

function* watchSearch(action) {
  try {
    const query = action.payload
    console.log('---Calling-----', query)
    const res = yield call(api.searchNetwork, query)
    const json = yield call([res, 'json'])

    console.log('---Called----', json)
    yield put({
      type: SEARCH_SUCCEEDED,
      payload: json
    })
  } catch (e) {
    console.log('ERRRRRRRRRR', e)
    yield put({
      type: SEARCH_FAILED,
      payload: { error: e.message }
    })
  }
}
