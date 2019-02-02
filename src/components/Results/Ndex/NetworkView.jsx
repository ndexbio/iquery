import React from 'react'
import './style.css'
import Split from 'react-split'

import NetworkViewer from './NetworkViewer'

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const NetworkView = props => (
  <Split sizes={[70, 30]} direction="vertical" gutterSize={7}>
    <NetworkViewer {...props} />
    <div className="property-view" />
  </Split>
)

export default NetworkView
