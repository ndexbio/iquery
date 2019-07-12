import { handleActions } from 'redux-actions'
import {
  setSettingsOpen,
  setServicesListOpen,
  setHighlights,
  setSelectedSource
} from '../actions/uiState'

const DEF_STATE = {
  isSettingsOpen: false,
  servicesListOpen: false,
  highlights: true,
  selectedSource: ''
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
    }
  },
  DEF_STATE
)

export default uiState
