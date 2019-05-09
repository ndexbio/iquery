import { createAction } from 'redux-actions'

export const IMPORT_NETWORK_STARTED = 'IMPORT_NETWORK_STARTED'
export const IMPORT_NETWORK_SUCCEEDED = 'IMPORT_NETWORK_SUCCEEDED'
export const IMPORT_NETWORK_FAILED = 'IMPORT_NETWORK_FAILED'

export const importNetworkStarted = createAction(IMPORT_NETWORK_STARTED)
export const importNetworkSucceeded = createAction(IMPORT_NETWORK_SUCCEEDED)
export const importNetworkFailed = createAction(IMPORT_NETWORK_FAILED)

export const SET_PORT = 'SET_PORT'
export const setPort = createAction(SET_PORT)

export const SET_AVAILABLE = 'SET_AVAILABLE'
export const setAvailable = createAction(SET_AVAILABLE)
