import React from 'react'
import renderer from 'react-test-renderer'

import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'
import rootSaga from './sagas/ndexSaga'
import cyRestSaga from './sagas/cyRestSaga'
import cyRestStatusSaga from './sagas/cyRestStatusSaga'
import ndexSaveSaga from './sagas/ndexSaveSaga'

import { App, Top } from './App'

it('renders without crashing', () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
    )
  )
  sagaMiddleware.run(rootSaga)
  sagaMiddleware.run(cyRestSaga)
  sagaMiddleware.run(cyRestStatusSaga)
  sagaMiddleware.run(ndexSaveSaga)

  const result = renderer.create(
    <Provider store={store}>
      <Router>
        <Top />
      </Router>
    </Provider>).toJSON();

  expect(result).toBeDefined();
})
