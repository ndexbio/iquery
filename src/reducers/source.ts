import { handleActions } from 'redux-actions'
import {
  findSourceFailed,
  findSourceStarted,
  findSourceSucceeded,
  setCurrentSource
} from '../actions/source'

import { SourceState } from './types'

const defaultState: SourceState = {
  isFetchingSource: false,
  sources: [],
  error: null,
  currentSource: null
}

const source = handleActions(
  {
    [findSourceStarted]: (state: SourceState, action) => {
      return {
        ...state,
        isFetchingSource: true,
        error: null,
        sources: []
      }
    },
    [findSourceSucceeded]: (state: SourceState, action) => {
      return {
        ...state,
        sources: action.sources,
        isFetchingSource: false,
        error: null
      }
    },
    [findSourceFailed]: (state: SourceState, action) => {
      console.warn('Error:', action.error)
      return {
        ...state,
        isFetchingSource: false,
        error: action.error,
        sources: []
      }
    },
    [setCurrentSource]: (state: SourceState, action) => {
      return {
        ...state,
        currentSource: action.payload
      }
    }
  },
  defaultState
)

export default source
