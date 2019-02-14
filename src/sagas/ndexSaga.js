import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from '../api/ndex'
import * as myGeneApi from '../api/mygene'

import {
  SEARCH_STARTED,
  SEARCH_FAILED,
  SEARCH_SUCCEEDED
} from '../actions/search'

import {
  NETWORK_FETCH_STARTED,
  NETWORK_FETCH_SUCCEEDED,
  NETWORK_FETCH_FAILED
} from '../actions/network'

export default function* rootSaga() {
  console.log('rootSaga reporting for duty')
  yield takeLatest(SEARCH_STARTED, watchSearch)
  yield takeLatest(NETWORK_FETCH_STARTED, fetchNetwork)
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

    const filtered = filterGenes(geneJson)

    yield put({
      type: SEARCH_SUCCEEDED,
      payload: {
        ndex: json,
        genes: filtered.uniqueGeneMap,
        notFound: filtered.notFound
      }
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

function* fetchNetwork(action) {
  try {
    const uuid = action.payload
    const cx = yield call(api.fetchNetwork, uuid)
    const json = yield call([cx, 'json'])

    yield put({ type: NETWORK_FETCH_SUCCEEDED, cx: json })
  } catch (error) {
    yield put({ type: NETWORK_FETCH_FAILED, error })
  }
}

const filterGenes = resultList => {
  const uniqueGeneMap = new Map()
  const notFound = []

  let len = resultList.length
  while (len--) {
    const entry = resultList[len]
    if (entry.notfound) {
      notFound.push(entry.query)
    } else {
      uniqueGeneMap.set(entry.query, entry)
    }
  }

  return {
    uniqueGeneMap,
    notFound
  }
}
