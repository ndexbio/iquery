import { createAction } from 'redux-actions'

export const NETWORK_FETCH_STARTED = 'NETWORK_FETCH_STARTED'
export const NETWORK_FETCH_SUCCEEDED = 'NETWORK_FETCH_SUCCEEDED'
export const NETWORK_FETCH_FAILED = 'NETWORK_FETCH_FAILED'

export const NETWORK_CLEAR = 'NETWORK_CLEAR'

export const SELECT_NODES = 'SELECT_NODES'
export const UNSELECT_NODES = 'UNSELECT_NODES'
export const SELECT_EDGES = 'SELECT_EDGES'
export const UNSELECT_EDGES = 'UNSELECT_EDGES'
export const DESELECT_ALL = 'DESELECT_ALL'
export const CHANGE_TAB = 'CHANGE_TAB'
export const CHANGE_LIST_INDEX = 'CHANGE_LIST_INDEX'
export const SET_SHOW_TABLE_MODAL = 'SHOW_TABLE_MODAL';
export const SET_CY_JS = 'SET_CY_JS';

export const SET_ORIGINAL_NETWORK_URL = 'SET_ORIGINAL_NETWORK_URL'

export const networkFetchStarted = createAction(NETWORK_FETCH_STARTED)
export const networkFetchSucceeded = createAction(NETWORK_FETCH_SUCCEEDED)
export const networkFetchFailed = createAction(NETWORK_FETCH_FAILED)

export const networkClear = createAction(NETWORK_CLEAR)

// Object selection in the network window
export const selectNodes = createAction(SELECT_NODES)
export const unselectNodes = createAction(UNSELECT_NODES)
export const selectEdges = createAction(SELECT_EDGES)
export const unselectEdges = createAction(UNSELECT_EDGES)
export const deselectAll = createAction(DESELECT_ALL)
export const changeTab = createAction(CHANGE_TAB)
export const changeListIndex = createAction(CHANGE_LIST_INDEX)
export const setShowTableModal = createAction(SET_SHOW_TABLE_MODAL)

export const setOriginalNetworkUrl = createAction(SET_ORIGINAL_NETWORK_URL)

export const setCyJs = createAction(SET_CY_JS);