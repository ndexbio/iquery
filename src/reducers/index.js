import { combineReducers } from 'redux'

import search from './search'
import uiState from './uiState'
import network from './network'
import cyrest from './cyrest'
import ndexSave from './ndexSave'

const rootReducer = combineReducers({
  search,
  uiState,
  network,
  cyrest,
  ndexSave,
})

export default rootReducer
