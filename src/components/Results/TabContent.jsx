import React from 'react'

import Ndex from './Ndex'
import LoadingPanel from '../LoadingPanel'

const TabContent = props => {
  const { results } = props

  if (results === null || results === undefined) {
    return (
      <LoadingPanel 
        title={'Loading results'} 
        message={
          <div style={{color: 'black'}}>
            Please wait...
          </div>
        }
      />
    )
  } else {
    return (
      <Ndex 
        hits={results.results} 
        sourceUUID={results.sourceUUID}

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
        cyrestActions_importNetworkStarted={props.cyrestActions_importNetworkStarted}
        cyrestActions_setPort={props.cyrestActions_setPort}
  
        uiState_zoomed={props.uiState_zoomed}
        uiState_highlights={props.uiState_highlights}
        uiState_selectedSource={props.uiState_selectedSource}
        uiState_sortOrder={props.uiState_sortOrder}
        uiStateActions_setSortOrder={props.uiStateActions_setSortOrder}
        uiStateActions_setZoomed={props.uiStateActions_setZoomed}
        uiStateActions_setHighlights={props.uiStateActions_setHighlights}
        uiStateActions_clearSelectedGenes={props.uiStateActions_clearSelectedGenes}
  
        network={props.network}
        networkActions_changeTab={props.networkActions_changeTab}
        networkActions_selectNodes={props.networkActions_selectNodes}
        networkActions_unselectNodes={props.networkActions_unselectNodes}
        networkActions_selectEdges={props.networkActions_selectEdges}
        networkActions_unselectEdges={props.networkActions_unselectEdges}
        networkActions_changeListIndex={props.networkActions_changeListIndex}
        networkActions_networkFetchStarted={props.networkActions_networkFetchStarted}
  
        search_results={props.search_results}
        search_queryList={props.search_queryList}
        search_actualResults={props.search_actualResults}
        search_searchResults={props.search_searchResults}
        search_selectedGenes={props.search_selectedGenes}
        searchActions_clearSelectedGenes={props.searchActions_clearSelectedGenes}
        searchActions_setActualResults={props.searchActions_setActualResults}

        history={props.history}
      />
    )
  }
}

export default TabContent
