import { createAction } from 'redux-actions'

export const SET_QUERY = 'SET_QUERY'
export const CLEAR_QUERY = 'CLEAR_QUERY'

export const SEARCH_STARTED = 'SEARCH_STARTED'
export const SEARCH_SUCCEEDED = 'SEARCH_SUCCEEDED'
export const SEARCH_FAILED = 'SEARCH_FAILED'

export const FETCH_RESULT_STARTED = 'FETCH_RESULT_STARTED'
export const FETCH_RESULT_SUCCEEDED = 'FETCH_RESULT_SUCCEEDED'
export const FETCH_RESULT_FAILED = 'FETCH_RESULT_FAILED'

export const CLEAR_ALL = 'CLEAR_ALL'

export const SET_SELECTED_GENES = 'SET_SELECTED_GENES'

export const setQuery = createAction(SET_QUERY)
export const clearQuery = createAction(CLEAR_QUERY)

// For sending Job
export const searchStarted = createAction(SEARCH_STARTED)
export const searchSucceeded = createAction(SEARCH_SUCCEEDED)
export const searchFailed = createAction(SEARCH_FAILED)

// For getting result
export const fetchResultStarted = createAction(FETCH_RESULT_STARTED)
export const fetchResultSucceeded = createAction(FETCH_RESULT_SUCCEEDED)
export const fetchResultFailed = createAction(FETCH_RESULT_FAILED)

export const clearAll = createAction(CLEAR_ALL)

export const setSelectedGenes = createAction(SET_SELECTED_GENES)
