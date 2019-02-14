import { handleActions } from 'redux-actions'
import {
  setQuery,
  clearQuery,
  searchStarted,
  searchSucceeded,
  searchFailed,
  clearAll,
  setSelectedGenes
} from '../actions/search'

const defaultState = {
  isSearching: false,
  queryGenes: '',
  queryList: [],
  results: null,
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
    },
    [setSelectedGenes]: (state, payload) => {
      console.log('Setting selected gene:', payload)
      return { ...state, selectedGenes: payload.payload }
    }
  },
  defaultState
)

export default search
