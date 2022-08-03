import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api/ndex';
import * as myGeneApi from '../api/mygene';
import { getResult, checkStatus, getSource, postQuery } from '../api/search';
import getProteinInteractionsData from '../api/proteinInteractions';

import { FilteredGenes, filterGenes } from './ndexSaga-util';

import {
  SEARCH_STARTED,
  SEARCH_FAILED,
  SEARCH_SUCCEEDED,
  FETCH_RESULT_STARTED,
  FETCH_RESULT_SUCCEEDED,
  FETCH_RESULT_FAILED,
  SET_SEARCH_RESULT,
} from '../actions/search';

import {
  FIND_SOURCE_STARTED,
  FIND_SOURCE_FAILED,
  FIND_SOURCE_SUCCEEDED,
} from '../actions/source';

import {
  NETWORK_FETCH_STARTED,
  NETWORK_FETCH_SUCCEEDED,
  NETWORK_FETCH_FAILED,
} from '../actions/network';

const API_CALL_INTERVAL = 500;

/**
 * Call IQ service and set state
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function* watchSearch(action) {
  const geneList: string[] = action.payload.geneList;
  const validateGenesWithMyGene: boolean = action.payload.validateGenesWithMyGene;
  let sourceNames: string[] = action.payload.sourceNames;

  // If source names are missing, find them:
  if (!sourceNames || sourceNames.length === 0) {
    const sources = yield call(getSource);
    const sourceJson = yield call([sources, 'json']);
    const sourceList: any[] = sourceJson.results;
    sourceNames = sourceList.map((source) => source.name);
    sourceNames = sourceNames.filter((name) => name !== 'keyword');
  }

  const geneListString: string = geneList.join();

  try {
    // 1. send query to the service mygene.info to get gene information 
    let genes = new Map<string, Record<string, any>>();
    let notFound = new Array<string>();

    if (validateGenesWithMyGene) {
      const geneRes = yield call(myGeneApi.searchGenes, geneListString);
      const geneJson = yield call([geneRes, 'json']);
      const filtered: FilteredGenes = filterGenes(geneJson);

      genes = filtered.uniqueGeneMap;
      notFound = filtered.notFound;
    }

    // 2. send gene list query to the ndex service
    const searchRes = yield call(postQuery, geneList, sourceNames);

    const resultLocation = searchRes.headers.get('Location');
    const parts: string[] = resultLocation.split('/');
    const jobId: string = parts[parts.length - 1];

    yield put({
      type: SEARCH_SUCCEEDED,
      payload: {
        genes,
        notFound,
        resultLocation,
        jobId,
      },
    });
  } catch (e: any) {
    console.warn('NDEx search error:', e);
    yield put({
      type: SEARCH_FAILED,
      payload: {
        message: 'NDEx network search error',
        query: geneListString,
        error: e.message,
      },
    });
  }
}

// Simple sleep function using Promise
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function* watchSearchResult(action) {
  const jobId: string = action.payload.jobId;

  const resultList: any[] = [];
  const finishedSourceNames: Set<string> = new Set();

  try {
    while (true) {
      // Check overall status
      const statusRes = yield call(checkStatus, jobId);
      const statusJson = yield call([statusRes, 'json']);

      const proteinInteractionsSourceKey = 'protein-interactions-test';

      const status: any[] = statusJson.sources;
      let idx: number = status.length;

      while (idx--) {
        const src: Record<string, any> = status[idx];
        const { progress, sourceName } = src;
        if (progress === 100) {
          if (!finishedSourceNames.has(sourceName)) {
            const resultRes = yield call(getResult, jobId, sourceName);
            const json: Record<string, any> = yield call([resultRes, 'json']);

            // Need to add this new result.
            resultList.push(json.sources[0]);
            finishedSourceNames.add(sourceName);

            if(!finishedSourceNames.has(proteinInteractionsSourceKey) && json.validatedGenes != null){
              const proteinInteractionsData = yield call(getProteinInteractionsData, [json.validatedGenes])
              resultList.push(Object.assign({}, json.sources[0], {
                sourceName: proteinInteractionsSourceKey,
                sourceRank: 5,
                status: "complete",
                results: proteinInteractionsData
              }))
              finishedSourceNames.add(proteinInteractionsSourceKey)
            }

            json.sources = resultList;

            yield put({
              type: SET_SEARCH_RESULT,
              payload: {
                singleResult: json,
              },
            });
          }
        }
      }

      idx = status.length;
      let finishCount = 0;
      while (idx--) {
        if (status[idx].progress === 100) {
          finishCount++;
        }
      }
      if (finishCount === status.length) {
        console.log('!! Search & fetch finished:', finishCount, resultList);
        break;
      }

      // Wait 1 sec. and try API call again.
      yield call(sleep, API_CALL_INTERVAL);
    }

    yield put({
      type: FETCH_RESULT_SUCCEEDED,
      payload: {},
    });
  } catch (e: any) {
    console.warn('NDEx search error:', e);
    yield put({
      type: FETCH_RESULT_FAILED,
      payload: {
        message: 'Failed to fetch search result',
        jobId,
        error: e.message,
      },
    });
  }
}

function* fetchNetwork(action) {
  try {
    const params: Record<string, any> = action.payload;
    const id: string = params.id;
    const sourceUUID: string = params.sourceUUID;
    const networkUUID: string = params.networkUUID;

    const cx = yield call(api.fetchNetwork, id, sourceUUID, networkUUID);
    const json = yield call([cx, 'json']);

    yield put({ type: NETWORK_FETCH_SUCCEEDED, cx: json });
  } catch (error) {
    yield put({ type: NETWORK_FETCH_FAILED, error });
  }
}

export function* fetchSource(action) {
  try {
    const sources = yield call(getSource);
    const json = yield call([sources, 'json']);
    const orderedSources = json.results;
    yield put({ type: FIND_SOURCE_SUCCEEDED, sources: orderedSources });
  } catch (error) {
    yield put({ type: FIND_SOURCE_FAILED, error });
  }
}

export default function* rootSaga() {
  yield takeLatest(SEARCH_STARTED, watchSearch);
  yield takeLatest(FETCH_RESULT_STARTED, watchSearchResult);
  yield takeLatest(NETWORK_FETCH_STARTED, fetchNetwork);
  yield takeLatest(FIND_SOURCE_STARTED, fetchSource);
}
