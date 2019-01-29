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

/**
 * Calling NDEx network search and set state
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function* watchSearch(action) {
  const query = action.payload
  try {
    const res = yield call(api.searchNetwork, query)
    const json = yield call([res, 'json'])
    yield put({
      type: SEARCH_SUCCEEDED,
      payload: json
    })
  } catch (e) {
    console.warn('NDEx search error:', e)
    yield put({
      type: SEARCH_FAILED,
      payload: {
        message: 'NDEx network search error',
        query: query,
        error: e.message
      }
    })
  }
}
