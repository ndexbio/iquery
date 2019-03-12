import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import 'typeface-roboto'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import './index.css'
import { App, Top } from './App'
import * as serviceWorker from './serviceWorker'

// Import root reducers
import rootReducer from './reducers'
import rootSaga from './sagas/ndexSaga'
import cyRestSaga from './sagas/cyRestSaga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)
sagaMiddleware.run(cyRestSaga)

const Root = ({ store }) => (
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={Top} />
        <Route path="/:jobid/:sourceId/:networkId" component={App} />
        <Route path="/:jobid/:sourceId" component={App} />
        <Route path="/:jobid" component={App} />
      </Switch>
    </Router>
  </Provider>
)

render(<Root store={store} />, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
