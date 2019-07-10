import { handleActions } from 'redux-actions'
import { setNDExModalOpen, setProfile } from '../actions/ndexSave'

const DEF_STATE = {
  ndexModal: false,
  profile: null
}

const uiState = handleActions(
  {
    [setNDExModalOpen]: (state, payload) => {
      console.log('OPEN = ', payload.payload)
      return { ...state, ndexModal: payload.payload }
    },
    [setProfile]: (state, payload) => {
      return { ...state, profile: payload.payload }
    }
  },
  DEF_STATE
)

export default uiState
