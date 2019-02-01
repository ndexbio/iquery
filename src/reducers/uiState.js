import { handleActions } from 'redux-actions'
import { setSettingsOpen } from '../actions/uiState'

const DEF_STATE = {
  isSettingsOpen: false
}

const uiState = handleActions(
  {
    [setSettingsOpen]: (state, payload) => {
      console.log('OPEN = ', payload.payload)
      return { ...state, isSettingsOpen: payload.payload }
    }
  },
  DEF_STATE
)

export default uiState
