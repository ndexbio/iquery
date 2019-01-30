import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from '../api/ndex'
import * as myGeneApi from '../api/mygene'

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
    const geneRes = yield call(myGeneApi.searchGenes, query.split(' ').join())
    const geneJson = yield call([geneRes, 'json'])
    const res = yield call(api.searchNetwork, query)
    const json = yield call([res, 'json'])

    const newMap = filterGenes(geneJson)

    yield put({
      type: SEARCH_SUCCEEDED,
      payload: { ndex: json, genes: newMap }
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

const filterGenes = resultList => {

  const uniqueGeneMap = new Map()

  let len = resultList.length
  while(len--) {
    const entry = resultList[len]
    uniqueGeneMap.set(entry.query, entry)
  }

  return uniqueGeneMap
}
