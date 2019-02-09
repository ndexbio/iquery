import { handleActions, combineActions } from 'redux-actions'
import {
  networkFetchStarted,
  networkFetchFailed,
  networkFetchSucceeded,
  selectNode
} from '../actions/network'

const defaultState = {
  isFetching: false,
  uuid: '',
  network: null,
  selectedNode: null
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
    },
    [selectNode]: (state, payload) => {
      return { ...state, selectedNode: payload.payload}
    }
  },
  defaultState
)

export default network
