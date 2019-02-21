import { handleActions } from 'redux-actions'
import {
  findSourceFailed,
  findSourceStarted,
  findSourceSucceeded
} from '../actions/source'

const defaultState = {
  isFetchingSource: false,
  sources: []
}

const source = handleActions(
  {
    [findSourceStarted]: (state, payload) => {
      return {
        ...state,
        isFetchingSource: true,
        sources: []
      }
    },
    [findSourceSucceeded]: (state, payload) => {
      console.log('SOURCE===', payload)
      return { ...state, sources: payload.sources, isFetchingSource: false }
    },
    [findSourceFailed]: (state, payload) => {
      return { ...state, isFetchingSource: false, sources: [] }
    }
  },
  defaultState
)

export default source
