import React from 'react'
import './style.css'
import Split from 'react-split'
/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const NetworkView = props => (
  <Split sizes={[70, 30]} direction="vertical" gutterSize={7}>
    <div className="network-view">
      <h2>Network view</h2>
    </div>
    <div className="network-view">
      <h2>Properties</h2>
    </div>
  </Split>
)

export default NetworkView
