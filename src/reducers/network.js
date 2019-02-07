import { handleActions, combineActions } from 'redux-actions'
import {
  networkFetchStarted,
  networkFetchFailed,
  networkFetchSucceeded
} from '../actions/network'

const defaultState = {
  isFetching: false,
  uuid: '',
  network: null
}

const network = handleActions(
  {
    [networkFetchStarted]: (state, payload) => {
      return {
        ...state,
        isFetching: true,
        uuid: payload
      }
    },
    [networkFetchSucceeded]: (state, payload) => {
      return { ...state, network: payload.cx, isFetching: false }
    },
    [networkFetchFailed]: (state, payload) => {
      return { ...state, network: null, isFetching: false }
    }
  },
  defaultState
)

export default network
