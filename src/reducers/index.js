import { combineReducers } from 'redux'

import search from './search'
import uiState from './uiState'
import network from './network'
import source from './source'

const rootReducer = combineReducers({ source, search, uiState, network })

export default rootReducer
