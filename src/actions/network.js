import { createAction } from 'redux-actions'

export const NETWORK_FETCH_STARTED = 'NETWORK_FETCH_STARTED'
export const NETWORK_FETCH_SUCCEEDED = 'NETWORK_FETCH_SUCCEEDED'
export const NETWORK_FETCH_FAILED = 'NETWORK_FETCH_FAILED'

export const networkFetchStarted = createAction(NETWORK_FETCH_STARTED)
export const networkFetchSucceeded = createAction(NETWORK_FETCH_SUCCEEDED)
export const networkFetchFailed = createAction(NETWORK_FETCH_FAILED)
