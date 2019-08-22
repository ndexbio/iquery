import { createAction } from 'redux-actions'


/**
 * Global state for the application UI
 *
 * @type {string}
 */
export const SET_SETTINGS_OPEN = 'SET_SETTINGS_OPEN'
export const setSettingsOpen = createAction(SET_SETTINGS_OPEN)

export const SET_CYTOSCAPE_STATUS = 'SET_CYTOSCAPE_STATUS'
export const setCytoscapeStatus = createAction(SET_CYTOSCAPE_STATUS)

export const SET_SERVICES_LIST_OPEN = 'SET_SERVICES_LIST_OPEN'
export const setServicesListOpen = createAction(SET_SERVICES_LIST_OPEN)

export const SET_HIGHLIGHTS = 'SET_HIGHLIGHTS'
export const setHighlights = createAction(SET_HIGHLIGHTS)

export const SET_ZOOMED = 'SET_ZOOMED'
export const setZoomed = createAction(SET_ZOOMED)

export const RESET_ZOOMED = 'RESET_ZOOMED'
export const resetZoomed = createAction(RESET_ZOOMED)

// Selected tab
export const SET_SELECTED_SOURCE = 'SET_SELECTED_SOURCE'
export const setSelectedSource = createAction(SET_SELECTED_SOURCE)

// Sort settings
export const SET_SORT = 'SET_SORT'
export const SET_SORT_ORDER = 'SET_SORT_ORDER'
export const SET_OVERLAP_ON = 'SET_OVERLAP_ON'
export const SET_OVERLAP_THRESHOLD_ON = 'SET_OVERLAP_THRESHOLD_ON'
export const SET_OVERLAP_THRESHOLD_VALUE = 'SET_OVERLAP_THRESHOLD_VALUE'
export const SET_P_VALUE_ON = 'SET_P_VALUE_ON'
export const SET_P_VALUE_THRESHOLD_ON = 'SET_P_VALUE_THRESHOLD_ON'
export const SET_THRESHOLD_VALUE = 'SET_THRESHOLD_VALUE'

export const setSort = createAction(SET_SORT)
export const setSortOrder = createAction(SET_SORT_ORDER)
export const setOverlapOn = createAction(SET_OVERLAP_ON)
export const setOverlapThresholdOn = createAction(SET_OVERLAP_THRESHOLD_ON)
export const setOverlapThresholdValue = createAction(SET_OVERLAP_THRESHOLD_VALUE)
export const setPValueOn = createAction(SET_P_VALUE_ON)
export const setPValueThresholdOn = createAction(SET_P_VALUE_THRESHOLD_ON)
export const setPValueThresholdValue = createAction(SET_THRESHOLD_VALUE)