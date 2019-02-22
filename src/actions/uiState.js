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

