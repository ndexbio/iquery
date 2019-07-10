import { createAction } from 'redux-actions'

/**
 * State for ndexSave UI
 *
 * @type {string}
 */
export const SET_NDEX_MODAL_OPEN = 'SET_NDEX_MODAL_OPEN'
export const setNDExModalOpen = createAction(SET_NDEX_MODAL_OPEN)

export const SET_PROFILE = 'SET_PROFILE'
export const setProfile = createAction(SET_PROFILE)

export const CREDENTIALS_SIGN_ON = 'CREDENTIALS_SIGN_ON'
export const credentialsSignOn = createAction(CREDENTIALS_SIGN_ON)

export const GOOGLE_SIGN_ON = 'GOOGLE_SIGN_ON'
export const googleSignOn = createAction(GOOGLE_SIGN_ON)
