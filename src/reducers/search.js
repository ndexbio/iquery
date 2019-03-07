import { handleActions } from 'redux-actions'
import {
  setQuery,
  clearQuery,
  searchStarted,
  searchSucceeded,
  searchFailed,
  clearAll,
  setSelectedGenes,
  fetchResultStarted,
  fetchResultSucceeded,
  fetchResultFailed
} from '../actions/search'

const EMPTY_STATE = {
  isSearching: false,
  isFetching: false,
  queryGenes: '',
  queryList: [],
  results: null,
  searchStatus: null,
  searchResults: null,
  selectedGenes: []
}


const search = handleActions(
  {
    [setQuery]: (state, payload) => {
      return { ...state, queryGenes: payload.payload }
    },
    [clearQuery]: (state, payload) => {
      return { ...state, queryGenes: '', queryList: [] }
    },
    [clearAll]: (state, payload) => {
      // return { ...state, queryGenes: '', queryList: [], results: null }
      return EMPTY_STATE
    },
    [searchStarted]: (state, payload) => {
      return {
        ...state,
        isSearching: true,
        queryList: state.queryGenes.split(' ')
      }
    },
    [searchSucceeded]: (state, payload) => {
      return { ...state, results: payload.payload, isSearching: false }
    },
    [searchFailed]: (state, payload) => {
      return { ...state, isSearching: false }
    },
    [setSelectedGenes]: (state, payload) => {
      console.log('Setting selected gene:', payload)
      return { ...state, selectedGenes: payload.payload }
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
        searchResults: payload.payload.searchResults,
        isFetching: false
      }
    },
    [fetchResultFailed]: (state, payload) => {
      return { ...state, isFetching: false }
    }
  },
  EMPTY_STATE
)

export default search
