import { combineReducers } from 'redux'

import search from './search'
import uiState from './uiState'
import network from './network'
import source from './source'
import cyrest from './cyrest'

const rootReducer = combineReducers({
  source,
  search,
  uiState,
  network,
  cyrest
})

export default rootReducer
