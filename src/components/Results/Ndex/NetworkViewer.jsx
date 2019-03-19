import React from 'react'
import './style.css'
import CytoscapeViewer from '../CytoscapeViewer'
import LoadingPanel from '../../LoadingPanel'

const NetworkViewer = props => (
  <div className="network-view">

    {props.network.isFetching ? (
      <LoadingPanel
        title="Loading Network..."
      />
    ) : (
      <CytoscapeViewer {...props} />
    )}
  </div>
)

export default NetworkViewer
