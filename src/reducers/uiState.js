import { handleActions } from 'redux-actions';
import {
  setSettingsOpen,
  setServicesListOpen,
  setHighlights,
  setSelectedSource,
  setPathwayFigure,
  setPathwayFigureSource,
  setFitPathwayFigure,
  setSortBy,
  setSortOptions,
  setLayout,
  setLayouts,
  fitNetworkView,
  update,
  setAnnotations,
} from '../actions/uiState';

const DEF_STATE = {
  isSettingsOpen: false,
  servicesListOpen: false,
  highlights: false,
  selectedSource: 'enrichment',
  pathwayFigure: true,
  pathwayFigureSource: null,
  fitPathwayFigure: false,
  sortOptions: ['Overlap', 'p-Value', 'Similarity'],
  sortBy: 'Overlap',
  layout: 'Preset',
  layouts: [],
  fit: true,
  annotations: false,
};

const uiState = handleActions(
  {
    [setSettingsOpen]: (state, payload) => {
      console.log('OPEN = ', payload.payload);
      return { ...state, isSettingsOpen: payload.payload };
    },
    [setServicesListOpen]: (state, payload) => {
      return { ...state, servicesListOpen: payload.payload };
    },
    [setHighlights]: (state, payload) => {
      return { ...state, highlights: payload.payload };
    },
    [setSelectedSource]: (state, payload) => {
      return { ...state, selectedSource: payload.payload };
    },
    [setPathwayFigure]: (state, payload) => {
      return { ...state, pathwayFigure: payload.payload };
    },
    [setPathwayFigureSource]: (state, payload) => {
      return { ...state, pathwayFigureSource: payload.payload };
    },
    [setFitPathwayFigure]: (state, payload) => {
      return { ...state, fitPathwayFigure: payload.payload };
    },
    [setSortOptions]: (state, payload) => {
      return {
        ...state,
        sortOrder: payload.payload,
      };
    },
    [setSortBy]: (state, payload) => {
      return {
        ...state,
        sortBy: payload.payload,
      };
    },
    [setLayout]: (state, payload) => {
      return {
        ...state,
        layout: payload.payload,
      };
    },
    [setLayouts]: (state, payload) => {
      return {
        ...state,
        layouts: payload.payload,
      };
    },
    [fitNetworkView]: (state, payload) => {
      return {
        ...state,
        fit: !state.fit,
      };
    },
    [update]: (state, payload) => {
      return {
        ...state,
        layouts: payload.payload.layouts,
        layout: payload.payload.layout,
        annotations: payload.payload.annotations
          ? !state.annotations
          : state.annotations,
      };
    },
    [setAnnotations]: (state, payload) => {
      return {
        ...state,
        annotations: payload.payload,
      };
    },
  },
  DEF_STATE
);

export default uiState;
