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
  fetchResultFailed,
  setSearchResult
} from '../actions/search'

const EMPTY_STATE = {
  isSearching: false,
  searchFinished: [],
  isFetching: false,
  queryGenes: '',
  queryList: [],
  results: null,
  searchStatus: null,
  searchResults: null,
  selectedGenes: [],
  resultList: []
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
      return EMPTY_STATE
    },
    [searchStarted]: (state, payload) => {
      console.log('------------ Start  1 ------------------::')
      const sources = payload.payload.sourceNames
      const sourceLen = sources.length
      const searchFinished = {}
      sources.forEach(source => {
        searchFinished[source] = false
      })

      return {
        ...state,
        isSearching: true,
        searchFinished,
        resultList: [],
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
        // searchResults: payload.payload.searchResults,
        isFetching: false
      }
    },
    [fetchResultFailed]: (state, payload) => {
      return { ...state, isFetching: false }
    },
    [setSearchResult]: (state, payload) => {
      const singleResult = payload.payload.singleResult

      const newList = [...state.resultList, singleResult]
      console.log('------------ Setting single ------------------::', newList)
      return {
        ...state,
        searchResults: singleResult
      }
    }
  },
  EMPTY_STATE
)

export default search
