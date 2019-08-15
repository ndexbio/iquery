import { createAction } from 'redux-actions'

export const IMPORT_NETWORK_STARTED = 'IMPORT_NETWORK_STARTED'
export const IMPORT_NETWORK_SUCCEEDED = 'IMPORT_NETWORK_SUCCEEDED'
export const IMPORT_NETWORK_FAILED = 'IMPORT_NETWORK_FAILED'

export const importNetworkStarted = createAction(IMPORT_NETWORK_STARTED)
export const importNetworkSucceeded = createAction(IMPORT_NETWORK_SUCCEEDED)
export const importNetworkFailed = createAction(IMPORT_NETWORK_FAILED)

export const SET_PORT = 'SET_PORT'
export const setPort = createAction(SET_PORT)

export const FETCH_AVAILABLE = 'FETCH_AVAILABLE'
export const SET_AVAILABLE = 'SET_AVAILABLE'

export const fetchAvailable = createAction(FETCH_AVAILABLE)
export const setAvailable = createAction(SET_AVAILABLE)

export const START_CYREST_POLLING = 'START_CYREST_POLLING'
export const STOP_CYREST_POLLING = 'STOP_CYREST_POLLING'

export const startCyRestPolling = createAction(START_CYREST_POLLING)
export const stopCyRestPolling = createAction(STOP_CYREST_POLLING)