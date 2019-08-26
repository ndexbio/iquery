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
      <CytoscapeViewer    
        uiState_zoomed={props.uiState_zoomed}
        uiState_highlights={props.uiState_highlights}
        uiStateActions_setZoomed={props.uiStateActions_setZoomed}
        uiStateActions_setHighlights={props.uiStateActions_setHighlights}
        uiStateActions_clearSelectedGenes={props.uiStateActions_clearSelectedGenes}
  
        network_nodeCount={props.network.nodeCount}
        network_edgeCount={props.network.edgeCount}
        network_backgroundColor={props.network.backgroundColor}
        network_network={props.network.network}
        networkActions_changeTab={props.networkActions_changeTab}
        networkActions_selectNodes={props.networkActions_selectNodes}
        networkActions_unselectNodes={props.networkActions_unselectNodes}
        networkActions_selectEdges={props.networkActions_selectEdges}
        networkActions_unselectEdges={props.networkActions_unselectEdges}

        search_selectedGenes={props.search_selectedGenes}
      />
    )}
  </div>
)

export default NetworkViewer
