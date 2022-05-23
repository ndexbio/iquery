import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import 'typeface-roboto'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import './index.css'
import { App, Top } from './App'
import ErrorBoundary from './components/ErrorBoundary';
import * as serviceWorker from './serviceWorker'

// Import root reducers
import rootReducer from './reducers'
import rootSaga from './sagas/ndexSaga'
import cyRestSaga from './sagas/cyRestSaga'
import cyRestStatusSaga from './sagas/cyRestStatusSaga'
import ndexSaveSaga from './sagas/ndexSaveSaga'
import ReactGA from 'react-ga4'

import { SET_QUERY } from './actions/search'

import { GOOGLE_ANALYTICS_ID } from './api/config'

// Avoid HTTP
const location = window.location
if (location.hostname !== 'localhost' && location.protocol !== 'https:') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`)
}

if (GOOGLE_ANALYTICS_ID === '' || GOOGLE_ANALYTICS_ID == null){
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  })
}

const EventActions = {
  SetQuery: SET_QUERY,
  OpenInCytoscape: 'OPEN_IN_CYTOSCAPE',
  NetworkSelected: 'NETWORK_FETCH_STARTED'
}

const gaMiddleware = store => next => action => {
  handleEvent(action)
  return next(action)
}

const handleEvent = event => {
  const eventType = event.type
  if (eventType === SET_QUERY) {
    ReactGA.event({
      category: 'User Action',
      action: EventActions.SetQuery,
      label: event.payload
    })
  } else if (eventType === 'IMPORT_NETWORK_STARTED') {
    ReactGA.event({
      category: 'User Action',
      action: EventActions.OpenInCytoscape,
      label: event.payload.uuid
    })
  } else if ('NETWORK_FETCH_STARTED') {
    if (event.payload === undefined || event.payload == null) {
      return
    }
    ReactGA.event({
      category: 'User Action',
      action: EventActions.NetworkSelected,
      label: `${event.payload.sourceUUID}/${event.payload.networkUUID}`
    })
  }
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(gaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)
sagaMiddleware.run(cyRestSaga)
sagaMiddleware.run(cyRestStatusSaga)
sagaMiddleware.run(ndexSaveSaga)

const Root = ({ store }) => (
  <Provider store={store}>
    <ErrorBoundary message={'Sorry, there was an error loading this page'}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route
            exact
            path={['/', '/iquery', '/iquery/', '/iquery//', '/iquery/iquery']}
            component={Top}
          />
          <Route path="/:jobid/:sourceId/:networkId" component={App} />
          <Route path="/:jobid/:sourceId" component={App} />
          <Route path="/:jobid" component={App} />
        </Switch>
      </Router>
    </ErrorBoundary>
  </Provider>
)

render(<Root store={store} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
