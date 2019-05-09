import { handleActions } from 'redux-actions'
import {
  importNetworkFailed,
  importNetworkStarted,
  importNetworkSucceeded,
  setAvailable,
  setPort
} from '../actions/cyrest'

const defaultState = {
  available: false,
  port: 1234,
  error: null
}

const source = handleActions(
  {
    [importNetworkStarted]: (state, payload) => {
      return {
        ...state,
        error: null
      }
    },
    [importNetworkSucceeded]: (state, payload) => {
      return {
        ...state,
        error: null
      }
    },
    [importNetworkFailed]: (state, payload) => {
      console.warn('Error===', payload.error)
      return {
        ...state,
        error: payload.error
      }
    },
    [setPort]: (state, payload) => {
      console.log('CyREST port = ', payload.payload)
      return { ...state, port: payload.payload }
    },
    [setAvailable]: (state, payload) => {
      console.log('CyREST available = ', payload.payload)
      return { ...state, available: payload.payload }
    }
  },
  defaultState
)

export default source
