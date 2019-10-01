import { handleActions } from 'redux-actions'
import {
  setSettingsOpen,
  setServicesListOpen,
  setHighlights,
  setSelectedSource,
  setSortBy,
  setSortOptions
} from '../actions/uiState'

const DEF_STATE = {
  isSettingsOpen: false,
  servicesListOpen: false,
  highlights: false,
  selectedSource: 'enrichment',
  sortOptions: ['Similarity', 'p-Value', 'Overlap'],
  sortBy: 'Similarity'
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
    [setSortOptions]: (state, payload) => {
      return {
        ...state,
        sortOrder: payload.payload
      }
    },
    [setSortBy]: (state, payload) => {
      return {
        ...state,
        sortBy: payload.payload
      }
    }
  },
  DEF_STATE
)

export default uiState
