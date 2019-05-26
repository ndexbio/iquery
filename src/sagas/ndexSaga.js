import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as api from '../api/ndex'
import * as myGeneApi from '../api/mygene'
import * as cySearchApi from '../api/search'

import {
  SEARCH_STARTED,
  SEARCH_FAILED,
  SEARCH_SUCCEEDED,
  FETCH_RESULT_STARTED,
  FETCH_RESULT_SUCCEEDED,
  FETCH_RESULT_FAILED
} from '../actions/search'

import {
  FIND_SOURCE_STARTED,
  FIND_SOURCE_FAILED,
  FIND_SOURCE_SUCCEEDED
} from '../actions/source'

import {
  NETWORK_FETCH_STARTED,
  NETWORK_FETCH_SUCCEEDED,
  NETWORK_FETCH_FAILED
} from '../actions/network'

const API_CALL_INTERVAL = 1000

const SELECTED_SOURCES = ['enrichment', 'interactome']

export default function* rootSaga() {
  yield takeLatest(SEARCH_STARTED, watchSearch)
  yield takeLatest(FETCH_RESULT_STARTED, watchSearchResult)
  yield takeLatest(NETWORK_FETCH_STARTED, fetchNetwork)
  yield takeLatest(FIND_SOURCE_STARTED, fetchSource)
}

/**
 * Calls Cytoscape Search service and set state
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function* watchSearch(action) {
  const geneList = action.payload.geneList
  let sourceNames = action.payload.sourceNames

  // If source names are missing, find them:
  if (sourceNames === undefined) {
    const sources = yield call(cySearchApi.getSource, null)
    const sourceJson = yield call([sources, 'json'])
    const sourceList = sourceJson.results
    sourceNames = sourceList.map(source => source.name)
    sourceNames = sourceNames.filter(name => name !== 'keyword')

    // TODO: this is a hack

    console.log('Getting source list: ', sourceNames)
  }
  const geneListString = geneList.join()

  try {
    // Call 1: Send query and get JobID w/ gene props from MyGene
    const [geneRes, searchRes] = yield all([
      call(myGeneApi.searchGenes, geneListString),
      call(cySearchApi.postQuery, geneList, sourceNames)
    ])

    const geneJson = yield call([geneRes, 'json'])
    const resultLocation = searchRes.headers.get('Location')
    const parts = resultLocation.split('/')
    const jobId = parts[parts.length - 1]
    const filtered = filterGenes(geneJson)

    yield put({
      type: SEARCH_SUCCEEDED,
      payload: {
        genes: filtered.uniqueGeneMap,
        notFound: filtered.notFound,
        resultLocation,
        jobId
      }
    })
  } catch (e) {
    console.warn('NDEx search error:', e)
    yield put({
      type: SEARCH_FAILED,
      payload: {
        message: 'NDEx network search error',
        query: geneListString,
        error: e.message
      }
    })
  }
}

const checkStatus = statusJson => {
  const { progress } = statusJson
  if (progress === 100) {
    return true
  } else {
    return false
  }
}

// Simple sleep function using Promise
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function* watchSearchResult(action) {
  const jobId = action.payload.jobId

  try {
    let finished = false
    let statusJson = null

    while (!finished) {
      const statusRes = yield call(cySearchApi.checkStatus, jobId)
      statusJson = yield call([statusRes, 'json'])
      finished = checkStatus(statusJson)

      if (finished) {
        break
      } else {
        yield call(sleep, API_CALL_INTERVAL)
      }
    }

    const resultRes = yield call(cySearchApi.getResult, jobId)
    const resultJson = yield call([resultRes, 'json'])

    yield put({
      type: FETCH_RESULT_SUCCEEDED,
      payload: {
        searchResults: resultJson
      }
    })
  } catch (e) {
    console.warn('NDEx search error:', e)
    yield put({
      type: FETCH_RESULT_FAILED,
      payload: {
        message: 'Failed to fetch search result',
        jobId,
        error: e.message
      }
    })
  }
}

function* fetchNetwork(action) {
  try {
    const params = action.payload
    const id = params.id
    const sourceUUID = params.sourceUUID
    const networkUUID = params.networkUUID

    const cx = yield call(api.fetchNetwork, id, sourceUUID, networkUUID)
    const json = yield call([cx, 'json'])

    console.log('Network fetched: ', json)

    yield put({ type: NETWORK_FETCH_SUCCEEDED, cx: json })
  } catch (error) {
    yield put({ type: NETWORK_FETCH_FAILED, error })
  }
}

function* fetchSource(action) {
  try {
    const sources = yield call(cySearchApi.getSource, null)
    const json = yield call([sources, 'json'])

    const reducedSources = json.results.filter(entry =>
      SELECTED_SOURCES.includes(entry['name'])
    )

    const orderedSources = reducedSources.sort(
      (firstEl, secondEl) =>
        SELECTED_SOURCES.indexOf(firstEl['name']) -
        SELECTED_SOURCES.indexOf(secondEl['name'])
    )

    yield put({ type: FIND_SOURCE_SUCCEEDED, sources: orderedSources })
  } catch (error) {
    yield put({ type: FIND_SOURCE_FAILED, error })
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
