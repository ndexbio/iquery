import React, { useState } from 'react'
import './style.css'
import Split from 'react-split'

import NetworkViewer from './NetworkViewer'
import MemoTableBrowser from '../TableBrowser'
import NetworkToolbar from './NetworkToolbar'

const DEFAULT_RATIO = [50, 50]

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const NetworkView = props => {
  const [resized, setResize] = useState(null)

  const handleResizeEnd = e => {
    setResize(e)
  }

  return (
    <div className={'network-view-top'}>
      <NetworkToolbar {...props} />
      <Split
        sizes={DEFAULT_RATIO}
        direction="vertical"
        gutterSize={7}
        className={'nv-container'}
        onDragEnd={handleResizeEnd}
      >
        <NetworkViewer resized={resized} {...props} />
        <MemoTableBrowser {...props} />
      </Split>
    </div>
  )
}

export default NetworkView
