import { createAction } from 'redux-actions'

export const FIND_SOURCE_STARTED = 'FIND_SOURCE_STARTED'
export const FIND_SOURCE_SUCCEEDED = 'FIND_SOURCE_SUCCEEDED'
export const FIND_SOURCE_FAILED = 'SEARCH_FAILED'

export const findSourceStarted = createAction(FIND_SOURCE_STARTED)
export const findSourceSucceeded = createAction(FIND_SOURCE_SUCCEEDED)
export const findSourceFailed = createAction(FIND_SOURCE_FAILED)
