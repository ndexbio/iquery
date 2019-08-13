import { handleActions } from 'redux-actions'
import {
  importNetworkFailed,
  importNetworkStarted,
  importNetworkSucceeded,
  fetchAvailable,
  setAvailable,
  startCyRestPolling,
  stopCyRestPolling,
  setPort,
  addSnackbar,
  removeSnackbar
} from '../actions/cyrest'

const defaultState = {
  isFetchingAvailable: false,
  available: false,
  isPollingAvailable: false,
  port: 1234,
  error: null,
  lastResponse: null,
  snackbar: null
}

const source = handleActions(
  {
    [importNetworkStarted]: (state, payload) => {
      return {
        ...state,
        lastResponse: null,
        error: null
      }
    },
    [importNetworkSucceeded]: (state, payload) => {
      return {
        ...state,
        lastResponse: payload,
        snackbar: 'SUCCESS',
        error: null
      }
    },
    [importNetworkFailed]: (state, payload) => {
      console.warn('Error===', payload.error)
      return {
        ...state,
        lastResponse: payload,
        error: payload.error,
        snackbar: 'FAILURE'
      }
    },
    [setPort]: (state, payload) => {
      console.log('CyREST port = ', payload.payload)
      return { ...state, port: payload.payload }
    },
    [fetchAvailable]: (state, payload) => {
      console.log('CyREST available = ', payload.payload)
      return { ...state, available: null, isFetchingAvailable: true }
    },
    [setAvailable]: (state, payload) => {
      console.log('CyREST available = ', payload.payload)
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
    },
    [removeSnackbar]: (state, payload) => {
      return {
        ...state,
        snackbar: null
      }
    }
  },
  defaultState
)

export default source
