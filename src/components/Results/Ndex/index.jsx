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
  <Split sizes={[50, 50]} gutterSize={7} className="ndex-base">
    <NetworkList ndexResults={props.search.results.ndex} {...props} />
    <NetworkView {...props} />
  </Split>
)

export default Ndex
