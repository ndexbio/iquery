import { handleActions } from "redux-actions"
import {
  findSourceFailed,
  findSourceStarted,
  findSourceSucceeded,
  setCurrentSource
} from "../actions/source"

const defaultState = {
  isFetchingSource: false,
  sources: [],
  error: null,
  currentSource: null
}

const source = handleActions(
  {
    [findSourceStarted]: (state, payload) => {
      return {
        ...state,
        isFetchingSource: true,
        error: null,
        sources: []
      }
    },
    [findSourceSucceeded]: (state, payload) => {
      return {
        ...state,
        sources: payload.sources,
        isFetchingSource: false,
        error: null
      }
    },
    [findSourceFailed]: (state, payload) => {
      console.warn("Error:", payload.error)
      return {
        ...state,
        isFetchingSource: false,
        error: payload.error,
        sources: []
      }
    },
    [setCurrentSource]: (state, payload) => {
      return {
        ...state,
        currentSource: payload.payload
      }
    }
  },
  defaultState
)

export default source
