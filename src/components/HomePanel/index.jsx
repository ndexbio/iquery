import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

import SearchPanel from '../SearchPanel'
import Title from './Title'

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const HomePanel = props => (
  <div className="home">
    <Title />
    <SearchPanel {...props} />
  </div>
)

export default HomePanel
