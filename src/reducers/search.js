import { handleActions } from 'redux-actions';
import { VALIDATE_GENES_WITH_MYGENE } from '../api/config';
import {
  setQuery,
  clearQuery,
  searchStarted,
  searchSucceeded,
  searchFailed,
  clearAll,
  setSelectedGenes,
  clearSelectedGenes,
  fetchResultStarted,
  fetchResultSucceeded,
  fetchResultFailed,
  setSearchResult,
  setActualResults,
} from '../actions/search';

const EMPTY_STATE = {
  isSearching: false,
  isFetching: false,
  queryGenes: '',
  queryList: [],
  results: null,
  searchStatus: null,
  searchResults: null,
  myGeneResponseMissing: false,
  searchHasErrored: false,
  selectedGenes: [],
  resultList: [],
  actualResults: [],
  validateGenesWithMyGene: VALIDATE_GENES_WITH_MYGENE
};

export const HGNC_REGEX = RegExp(
  '(^[a-zA-Z][a-zA-Z0-9-]*$)|(^C[0-9]+orf[0-9]+$)'
);

const search = handleActions(
  {
    [setQuery]: (state, payload) => {
      return { ...state, queryGenes: payload.payload };
    },
    [clearQuery]: (state, payload) => {
      return { ...state, queryGenes: '', queryList: [] };
    },
    [clearAll]: (state, payload) => {
      return EMPTY_STATE;
    },
    [searchStarted]: (state, payload) => {
      const newQueryList = state.queryGenes.split(' ');
      return {
        ...state,
        isSearching: true,
        resultList: [],
        queryList: newQueryList,
      };
    },
    [searchSucceeded]: (state, payload) => {
      return { ...state, myGeneResponseMissing: payload.payload.myGeneResponseMissing, results: payload.payload, isSearching: false };
    },
    [searchFailed]: (state, payload) => {
      return { ...state, searchHasErrored: true, isSearching: false };
    },
    [setSelectedGenes]: (state, payload) => {
      return { ...state, selectedGenes: [payload.payload] };
    },
    [clearSelectedGenes]: (state, payload) => {
      return {
        ...state,
        selectedGenes: [],
      };
    },
    [fetchResultStarted]: (state, payload) => {
      return {
        ...state,
        isFetching: true,
        searchStatus: null,
        searchResults: null,
      };
    },
    [fetchResultSucceeded]: (state, payload) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [fetchResultFailed]: (state, payload) => {
      return { ...state, isFetching: false };
    },
    [setSearchResult]: (state, payload) => {
      const singleResult = payload.payload.singleResult;
      return {
        ...state,
        searchResults: singleResult,
      };
    },
    [setActualResults]: (state, payload) => {
      return {
        ...state,
        actualResults: payload.payload,
      };
    },
  },
  EMPTY_STATE
);

export default search;
