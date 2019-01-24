import { createActions } from 'redux-actions'

const { setQuery, clear } = createActions({
  SET_QUERY: (query = '') => ({ query }),
  CLEAR: () => ({ query: null })
})

export { setQuery, clear }
