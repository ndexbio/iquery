import React, { useState } from 'react'
import './style.css'
import Split from 'react-split'

import NetworkViewer from './NetworkViewer'
import TableBrowser from '../TableBrowser'
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
      <NetworkToolbar
        handleImportNetwork={props.handleImportNetwork} 

        ndexSave_ndexModal={props.ndexSave_ndexModal}
        ndexSave_profile={props.ndexSave_profile}
        ndexSave_errorMessage={props.ndexSave_errorMessage}
        ndexSave_networkUrl={props.ndexSave_networkUrl}
        ndexSaveActions_saveToNDEx={props.ndexSaveActions_saveToNDEx}
        ndexSaveActions_setProfile={props.ndexSaveActions_setProfile}
        ndexSaveActions_setNDExModalOpen={props.ndexSaveActions_setNDExModalOpen}
        ndexSaveActions_credentialsSignOn={props.ndexSaveActions_credentialsSignOn}
        ndexSaveActions_googleSignOn={props.ndexSaveActions_googleSignOn}
        ndexSaveActions_setErrorMessage={props.ndexSaveActions_setErrorMessage}

        cyrest_available={props.cyrest_available}
        cyrest_isLoadingNetwork={props.cyrest_isLoadingNetwork}
        cyrest_lastResponse={props.cyrest_lastResponse}
        cyrestActions_startCyrestPolling={props.cyrestActions_startCyrestPolling}
        cyrestActions_stopCyrestPolling={props.cyrestActions_stopCyrestPolling}

        uiState_highlights={props.uiState_highlights}
        uiStateActions_setZoomed={props.uiStateActions_setZoomed}
        uiStateActions_setHighlights={props.uiStateActions_setHighlights}

        network_originalCX={props.network.originalCX}
        network_networkName={props.network.networkName}
        network_uuid={props.network.uuid}
      />
      <Split
        sizes={DEFAULT_RATIO}
        direction="vertical"
        gutterSize={7}
        className={'nv-container'}
        onDragEnd={handleResizeEnd}
      >
        <NetworkViewer
          resized={resized}
    
          uiState_zoomed={props.uiState_zoomed}
          uiState_highlights={props.uiState_highlights}
          uiStateActions_setZoomed={props.uiStateActions_setZoomed}
          uiStateActions_setHighlights={props.uiStateActions_setHighlights}
          uiStateActions_clearSelectedGenes={props.uiStateActions_clearSelectedGenes}
    
          network={props.network}
          networkActions_changeTab={props.networkActions_changeTab}
          networkActions_selectNodes={props.networkActions_selectNodes}
          networkActions_unselectNodes={props.networkActions_unselectNodes}
          networkActions_selectEdges={props.networkActions_selectEdges}
          networkActions_unselectEdges={props.networkActions_unselectEdges}

          search_selectedGenes={props.search_selectedGenes}
        />
        <TableBrowser
          resized={resized} 
          
          network={props.network}
          networkActions_changeTab={props.networkActions_changeTab}

          search_results={props.search_results}
        />
      </Split>
    </div>
  )
}

export default NetworkView
