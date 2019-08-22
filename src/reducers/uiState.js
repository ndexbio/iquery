import { handleActions } from 'redux-actions'
import {
  setSettingsOpen,
  setServicesListOpen,
  setHighlights,
  setSelectedSource,
  setZoomed,
  resetZoomed,
  setSort,
  setSortOrder,
  setOverlapOn,
  setOverlapThresholdOn,
  setOverlapThresholdValue,
  setPValueOn,
  setPValueThresholdOn,
  setPValueThresholdValue
} from '../actions/uiState'

const DEF_STATE = {
  isSettingsOpen: false,
  servicesListOpen: false,
  highlights: false,
  selectedSource: 'enrichment',
  zoomed: false,
  sort: true,
  sortOrder: ['p-Value', 'Overlap'],
  sortOverlapOn: false,
  sortOverlapThresholdOn: false,
  sortOverlapThresholdValue: 1,
  sortPValueOn: true,
  sortPValueThresholdOn: false,
  sortPValueThresholdValue: 0.05
}

const uiState = handleActions(
  {
    [setSettingsOpen]: (state, payload) => {
      console.log('OPEN = ', payload.payload)
      return { ...state, isSettingsOpen: payload.payload }
    },
    [setServicesListOpen]: (state, payload) => {
      return { ...state, servicesListOpen: payload.payload }
    },
    [setHighlights]: (state, payload) => {
      return { ...state, highlights: payload.payload }
    },
    [setSelectedSource]: (state, payload) => {
      return { ...state, selectedSource: payload.payload }
    },
    [setZoomed]: (state, payload) => {
      return {
        ...state,
        zoomed: true
      }
    },
    [resetZoomed]: (state, payload) => {
      return {
        ...state,
        zoomed: false
      }
    },
    [setSort]: (state, payload) => {
      return {
        ...state,
        sort: payload.payload
      }
    },
    [setSortOrder]: (state, payload) => {
      return {
        ...state,
        sortOrder: payload.payload
      }
    },
    [setOverlapOn]: (state, payload) => {
      return {
        ...state,
        sortOverlapOn: payload.payload
      }
    },
    [setOverlapThresholdOn]: (state, payload) => {
      return {
        ...state,
        sortOverlapThresholdOn: payload.payload
      }
    },
    [setOverlapThresholdValue]: (state, payload) => {
      return {
        ...state,
        sortOverlapThresholdValue: payload.payload
      }
    },
    [setPValueOn]: (state, payload) => {
      return {
        ...state,
        sortPValueOn: payload.payload
      }
    },
    [setPValueThresholdOn]: (state, payload) => {
      return {
        ...state,
        sortPValueThresholdOn: payload.payload
      }
    },
    [setPValueThresholdValue]: (state, payload) => {
      return {
        ...state,
        sortPValueThresholdValue: payload.payload
      }
    }
  },
  DEF_STATE
)

export default uiState
