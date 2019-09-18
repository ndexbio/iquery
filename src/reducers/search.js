import { handleActions } from "redux-actions"
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
  setActualResults
} from "../actions/search"

const EMPTY_STATE = {
  isSearching: false,
  isFetching: false,
  queryGenes: "",
  queryList: [],
  results: null,
  searchStatus: null,
  searchResults: null,
  selectedGenes: [],
  resultList: [],
  actualResults: []
}

const search = handleActions(
  {
    [setQuery]: (state, payload) => {
      return { ...state, queryGenes: payload.payload }
    },
    [clearQuery]: (state, payload) => {
      return { ...state, queryGenes: "", queryList: [] }
    },
    [clearAll]: (state, payload) => {
      return EMPTY_STATE
    },
    [searchStarted]: (state, payload) => {
      return {
        ...state,
        isSearching: true,
        resultList: [],
        queryList: state.queryGenes.split(" ")
      }
    },
    [searchSucceeded]: (state, payload) => {
      return { ...state, results: payload.payload, isSearching: false }
    },
    [searchFailed]: (state, payload) => {
      return { ...state, isSearching: false }
    },
    [setSelectedGenes]: (state, payload) => {
      return { ...state, selectedGenes: [payload.payload] }
    },
    [clearSelectedGenes]: (state, payload) => {
      return {
        ...state,
        selectedGenes: []
      }
    },
    [fetchResultStarted]: (state, payload) => {
      return {
        ...state,
        isFetching: true,
        searchStatus: null,
        searchResults: null
      }
    },
    [fetchResultSucceeded]: (state, payload) => {
      return {
        ...state,
        // searchResults: payload.payload.searchResults,
        isFetching: false
      }
    },
    [fetchResultFailed]: (state, payload) => {
      return { ...state, isFetching: false }
    },
    [setSearchResult]: (state, payload) => {
      const singleResult = payload.payload.singleResult
      return {
        ...state,
        searchResults: singleResult
      }
    },
    [setActualResults]: (state, payload) => {
      return {
        ...state,
        actualResults: payload.payload
      }
    }
  },
  EMPTY_STATE
)

export default search
