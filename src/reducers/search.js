import { handleActions, combineActions } from 'redux-actions'
import {
  setQuery,
  clearQuery,
  searchStarted,
  searchSucceeded,
  searchFailed,
  clearAll
} from '../actions/search'

const defaultState = {
  isSearching: false,
  queryGenes: '',
  queryList: [],
  results: null
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
      return { ...state, queryGenes: '', queryList: [], results: null }
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
    }
  },
  defaultState
)

export default search
