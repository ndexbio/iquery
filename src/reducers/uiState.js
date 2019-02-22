import { handleActions } from 'redux-actions'
import { setSettingsOpen, setCytoscapeStatus } from '../actions/uiState'

const DEF_STATE = {
  isSettingsOpen: false,
  isCytoscapeRunning: false
}

const uiState = handleActions(
  {
    [setSettingsOpen]: (state, payload) => {
      console.log('OPEN = ', payload.payload)
      return { ...state, isSettingsOpen: payload.payload }
    },
    [setCytoscapeStatus]: (state, payload) => {
      console.log('Cytoscape is running = ', payload.payload)
      return { ...state, isCytoscapeRunning: payload.payload }
    }
  },
  DEF_STATE
)

export default uiState
