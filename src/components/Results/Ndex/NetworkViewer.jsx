import React from 'react'
import './style.css'
import CytoscapeViewer from '../CytoscapeViewer'
import LoadingPanel from '../../LoadingPanel'
import { connect } from 'react-redux'


const NetworkViewer = props => (
  <div className="network-view">

    {props.network_isFetching ? (
      <LoadingPanel
        title="Loading Network..."
      />
    ) : (
      <CytoscapeViewer 
        resized={props.resized}
      />
    )}
  </div>
)

const mapStateToProps = state => {
  return {
    network_isFetching: state.network.isFetching
  }
}

export default connect(
  mapStateToProps
) (NetworkViewer)
