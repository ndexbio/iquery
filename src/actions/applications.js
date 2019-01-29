import { createAction } from 'redux-actions'

export const ADD_APPLICATION = 'ADD_APPLICATION'
export const REMOVE_APPLICATION = 'REMOVE_APPLICATION'

export const addApplication = createAction(ADD_APPLICATION)
export const removeApplication = createAction(REMOVE_APPLICATION)
