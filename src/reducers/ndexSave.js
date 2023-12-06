import { handleActions } from 'redux-actions'
import {
  setNDExModalOpen,
  setProfile,
  credentialsSignOn,
  googleSignOn,
  saveToNDEx,
  setErrorMessage,
  setNetworkUrl,
  setKeycloak,
} from '../actions/ndexSave'

const DEF_STATE = {
  ndexModal: false,
  profile: null,
  errorMessage: null,
  networkUrl: null,
  keycloak: null,
}

const ndexSave = handleActions(
  {
    [setKeycloak]: (state, payload) => {
      return {
        ...state,
        keycloak: payload.payload,
      }
    },
    [setNDExModalOpen]: (state, payload) => {
      return {
        ...state,
        ndexModal: payload.payload,
        errorMessage: null,
        networkUrl: null,
      }
    },
    [setProfile]: (state, payload) => {
      return { ...state, profile: payload.payload }
    },
    [credentialsSignOn]: (state, payload) => {
      return {
        ...state,
      }
    },
    [googleSignOn]: (state, payload) => {
      return {
        ...state,
      }
    },
    [saveToNDEx]: (state, payload) => {
      return {
        ...state,
      }
    },
    [setErrorMessage]: (state, payload) => {
      return {
        ...state,
        errorMessage: payload.payload,
      }
    },
    [setNetworkUrl]: (state, payload) => {
      return {
        ...state,
        networkUrl: payload.payload,
      }
    },
  },
  DEF_STATE,
)

export default ndexSave
