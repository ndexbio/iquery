import { handleActions, combineActions } from 'redux-actions'
import { setQuery, clear } from '../actions/search'

const defaultState = {
  applications: []
}

const search = handleActions(
  {
    [combineActions(setQuery, clear)]: (state, { payload: { query } }) => {
      return { ...state, query }
    }
  },
  defaultState
)

export default search
