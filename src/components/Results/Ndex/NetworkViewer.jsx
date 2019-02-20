import React from 'react'
import './style.css'
import NetworkToolbar from './NetworkToolbar'
import CytoscapeViewer from '../CytoscapeViewer'
import LoadingPanel from '../../LoadingPanel'

const NetworkViewer = props => (
  <div className="network-view">
    <NetworkToolbar {...props} />

    {props.network.isFetching ? (
      <LoadingPanel />
    ) : (
      <CytoscapeViewer {...props} />
    )}
  </div>
)

export default NetworkViewer
