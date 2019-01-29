import { handleActions, combineActions } from 'redux-actions'
import {
  setQuery,
  clearQuery,
  searchStarted,
  searchSucceeded,
  searchFailed
} from '../actions/search'

const defaultState = {
  isSearching: false,
  queryGenes: '',
  results: null
}

const search = handleActions(
  {
    [setQuery]: (state, payload) => {
      console.log('SET;', payload)
      return { ...state, queryGenes: payload.payload }
    },
    [clearQuery]: (state, payload) => {
      return { ...state, queryGenes: '' }
    },
    [searchStarted]: (state, payload) => {
      return { ...state, isSearching: true }
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
