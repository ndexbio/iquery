import { combineReducers } from 'redux'

import search from './search'
import applications from './applications'
import uiState from './uiState'

const rootReducer = combineReducers({ search, uiState })

export default rootReducer
