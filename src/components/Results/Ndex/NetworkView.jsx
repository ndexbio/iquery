import React from 'react'
import './style.css'
import Split from 'react-split'

import NetworkViewer from './NetworkViewer'
import TableBrowser from '../TableBrowser'

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const NetworkView = props => (
  <Split sizes={[70, 30]} direction="vertical" gutterSize={6}>
    <NetworkViewer {...props} />
    <TableBrowser className="property-view" {...props} />
  </Split>
)

export default NetworkView
