import { createAction } from 'redux-actions';

/**
 * Global state for the application UI
 *
 * @type {string}
 */
export const SET_SETTINGS_OPEN = 'SET_SETTINGS_OPEN';
export const setSettingsOpen = createAction(SET_SETTINGS_OPEN);

export const SET_CYTOSCAPE_STATUS = 'SET_CYTOSCAPE_STATUS';
export const setCytoscapeStatus = createAction(SET_CYTOSCAPE_STATUS);

export const SET_SERVICES_LIST_OPEN = 'SET_SERVICES_LIST_OPEN';
export const setServicesListOpen = createAction(SET_SERVICES_LIST_OPEN);

export const SET_HIGHLIGHTS = 'SET_HIGHLIGHTS';
export const setHighlights = createAction(SET_HIGHLIGHTS);

// Selected tab
export const SET_SELECTED_SOURCE = 'SET_SELECTED_SOURCE';
export const setSelectedSource = createAction(SET_SELECTED_SOURCE);

export const SET_PATHWAY_FIGURE = 'SET_PATHWAY_FIGURE';
export const setPathwayFigure = createAction(SET_PATHWAY_FIGURE);
export const SET_PATHWAY_FIGURE_SOURCE = 'SET_PATHWAY_FIGURE_SOURCE';
export const setPathwayFigureSource = createAction(SET_PATHWAY_FIGURE_SOURCE);
export const SET_FIT_PATHWAY_FIGURE = 'SET_FIT_PATHWAY_FIGURE';
export const setFitPathwayFigure = createAction(SET_FIT_PATHWAY_FIGURE);
export const SET_PATHWAY_FIGURE_TAB = 'SET_PATHWAY_FIGURE_TAB';
export const setPathwayFigureTab = createAction(SET_PATHWAY_FIGURE_TAB);

// Sort settings
export const SET_SORT_OPTIONS = 'SET_SORT_OPTIONS';
export const SET_SORT_BY = 'SET_SORT_BY';
export const setSortOptions = createAction(SET_SORT_OPTIONS);
export const setSortBy = createAction(SET_SORT_BY);

//Layout
export const SET_LAYOUT = 'SET_LAYOUT';
export const SET_LAYOUTS = 'SET_LAYOUTS';
export const setLayout = createAction(SET_LAYOUT);
export const setLayouts = createAction(SET_LAYOUTS);

//Annotations
export const SET_ANNOTATIONS = 'SET_ANNOTATIONS';
export const setAnnotations = createAction(SET_ANNOTATIONS);

//Fit
export const FIT_NETWORK_VIEW = 'FIT_NETWORK_VIEW';
export const fitNetworkView = createAction(FIT_NETWORK_VIEW);

export const UPDATE = 'UPDATE';
export const update = createAction(UPDATE);
