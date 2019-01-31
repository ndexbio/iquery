import React from 'react'
import './style.css'

import Split from 'react-split'
import NetworkView from './NetworkView'
import NetworkList from './NetworkList'

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Ndex = props => (
  <Split sizes={[40, 60]} gutterSize={7} className="ndex-base">
    <NetworkList {...props} />
    <NetworkView {...props} />
  </Split>
)

export default Ndex
