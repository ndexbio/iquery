import { handleActions } from 'redux-actions'
import {
  setNDExModalOpen,
  setProfile,
  credentialsSignOn,
  googleSignOn
} from '../actions/ndexSave'

const DEF_STATE = {
  ndexModal: false,
  profile: null
}

const ndexSave = handleActions(
  {
    [setNDExModalOpen]: (state, payload) => {
      console.log('OPEN = ', payload.payload)
      return { ...state, ndexModal: payload.payload }
    },
    [setProfile]: (state, payload) => {
      return { ...state, profile: payload.payload }
    },
    [credentialsSignOn]: (state, payload) => {
      return {
        ...state
      }
    },
    [googleSignOn]: (state, payload) => {
      return {
        ...state
      }
    }
  },
  DEF_STATE
)

export default ndexSave
