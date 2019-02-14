import { createAction } from 'redux-actions'

export const NETWORK_FETCH_STARTED = 'NETWORK_FETCH_STARTED'
export const NETWORK_FETCH_SUCCEEDED = 'NETWORK_FETCH_SUCCEEDED'
export const NETWORK_FETCH_FAILED = 'NETWORK_FETCH_FAILED'

export const SELECT_NODE = 'SELECT_NODE'
export const SELECT_EDGE = 'SELECT_EDGE'
export const DESELECT_ALL = 'DESELECT_ALL'

export const networkFetchStarted = createAction(NETWORK_FETCH_STARTED)
export const networkFetchSucceeded = createAction(NETWORK_FETCH_SUCCEEDED)
export const networkFetchFailed = createAction(NETWORK_FETCH_FAILED)

// Object selection in the network window
export const selectNode = createAction(SELECT_NODE)
export const selectEdge = createAction(SELECT_EDGE)
export const deselectAll = createAction(DESELECT_ALL)
