import React, { useEffect } from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
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
import ReactGA from 'react-ga'

import { SET_QUERY } from './actions/search'

// For Google Analygtics
const GA_DEV_ID = 'UA-62588031-6' // Dev server
const GA_STAGING_ID = 'UA-62588031-7' // Production

ReactGA.initialize(GA_DEV_ID)

const options = {}

const trackPage = page => {
  ReactGA.set({
    page,
    ...options
  })
  ReactGA.pageview(page)
}

let currentPage = ''

const gaMiddleware = store => next => action => {
  console.log('!!! Page Tracker:::', action)
  handleEvent(action)

  if (action.type === '@@router/LOCATION_CHANGE') {
    const nextPage = `${action.payload.location.pathname}${
      action.payload.location.search
    }`

    console.log('*** Page Tracker:::', nextPage)
    if (currentPage !== nextPage) {
      currentPage = nextPage
      trackPage(nextPage)
    }
  }

  return next(action)
}

const handleEvent = event => {
  const eventType = event.type
  console.log('*** handler:::', event, eventType)

  if (eventType === SET_QUERY) {
    console.log('*** FIRE', event)
    ReactGA.event({
      category: 'User Action',
      action: eventType,
      label: event.payload
    })
  } else if (eventType === 'IMPORT_NETWORK_STARTED') {
    console.log('*** FIRE22', event)
    ReactGA.event({
      category: 'User Action',
      action: 'OPEN_IN_CYTOSCAPE',
      label: event.payload.uuid
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
