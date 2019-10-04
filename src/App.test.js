import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { App, Top } from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Router>
      <Top />
    </Router>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
