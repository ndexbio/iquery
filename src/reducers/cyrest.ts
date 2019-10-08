import { handleActions } from 'redux-actions'
import { CyRestState } from './types'
import {
  importNetworkFailed,
  importNetworkStarted,
  importNetworkSucceeded,
  fetchAvailable,
  setAvailable,
  startCyRestPolling,
  stopCyRestPolling,
  setPort
} from '../actions/cyrest'

const defaultState: CyRestState = {
  isFetchingAvailable: false,
  available: false,
  isPollingAvailable: false,
  port: 1234,
  error: null,
  lastResponse: null,
  isLoadingNetwork: false
}

const cyrest = handleActions(
  {
    [importNetworkStarted]: (state, payload) => {
      return {
        ...state,
        lastResponse: null,
        isLoadingNetwork: true,
        error: null
      }
    },
    [importNetworkSucceeded]: (state, payload) => {
      return {
        ...state,
        lastResponse: payload,
        isLoadingNetwork: false,
        error: null
      }
    },
    [importNetworkFailed]: (state, payload) => {
      return {
        ...state,
        lastResponse: payload,
        error: payload.error,
        isLoadingNetwork: false
      }
    },
    [setPort]: (state, payload) => {
      console.info('CyREST port = ', payload.payload)
      return { ...state, port: payload.payload }
    },
    [fetchAvailable]: (state, payload) => {
      return { ...state, available: null, isFetchingAvailable: true }
    },
    [setAvailable]: (state, payload) => {
      return {
        ...state,
        available: payload.payload,
        isFetchingAvailable: false
      }
    },
    [startCyRestPolling]: (state, payload) => {
      return { ...state }
    },
    [stopCyRestPolling]: (state, payload) => {
      return { ...state }
    }
  },
  defaultState
)

export default cyrest
