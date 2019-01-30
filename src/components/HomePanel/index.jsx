import React from 'react'
import './style.css'
import InputPanel from '../InputPanel'
import Results from '../Results'
import TitleBar from './TitleBar'

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const HomePanel = props => (
  <div className="base">
    <TitleBar />
    <div className="container">
      <InputPanel className="input" {...props} />
      <Results className="results" {...props} />
    </div>
  </div>
)

export default HomePanel
