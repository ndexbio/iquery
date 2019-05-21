import { createAction } from 'redux-actions'

export const NETWORK_FETCH_STARTED = 'NETWORK_FETCH_STARTED'
export const NETWORK_FETCH_SUCCEEDED = 'NETWORK_FETCH_SUCCEEDED'
export const NETWORK_FETCH_FAILED = 'NETWORK_FETCH_FAILED'

export const NETWORK_CLEAR = 'NETWORK_CLEAR'

export const SET_NETWORK_SIZE = 'SET_NETWORK_SIZE'

export const SELECT_NODE = 'SELECT_NODE'
export const SELECT_EDGE = 'SELECT_EDGE'
export const DESELECT_ALL = 'DESELECT_ALL'

export const networkFetchStarted = createAction(NETWORK_FETCH_STARTED)
export const networkFetchSucceeded = createAction(NETWORK_FETCH_SUCCEEDED)
export const networkFetchFailed = createAction(NETWORK_FETCH_FAILED)

export const networkClear = createAction(NETWORK_CLEAR)

export const setNetworkSize = createAction(SET_NETWORK_SIZE)

// Object selection in the network window
export const selectNode = createAction(SELECT_NODE)
export const selectEdge = createAction(SELECT_EDGE)
export const deselectAll = createAction(DESELECT_ALL)
