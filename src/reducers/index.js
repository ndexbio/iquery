import { combineReducers } from 'redux'

import search from './search'
import applications from './applications'

const rootReducer = combineReducers({ search, applications})

export default rootReducer
