import { combineReducers } from 'redux'

import search from './search'
import uiState from './uiState'
import network from './network'

const rootReducer = combineReducers({ search, uiState, network })

export default rootReducer
