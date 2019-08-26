import React, { useEffect } from 'react'
import './style.css'

import InputPanel from '../InputPanel'
import Results from '../Results'
import AppShell from '../AppShell'
import LoadingPanel from '../LoadingPanel'

const HomePanel = props => {
  useEffect(() => {
    if (props.search.results !== null) {
      const jobId = props.search.results.jobId
      props.searchActions_fetchResultStarted({ jobId })
    }

    window.onpopstate = onBackButtonEvent
    return () => {}
  }, [])

  const onBackButtonEvent = e => {
    e.preventDefault()
    props.searchActions_clearAll()
    props.history.push('/')
  }

  const isFetching = props.search.isFetching
  const searchResult = props.search.searchResult

  // Still searching and no result is available
  if (isFetching && searchResult === null) {
    return (
      <AppShell
        uiState_servicesListOpen={props.uiState_servicesListOpen}
        uiState_isSettingsOpen={props.uiState_isSettingsOpen}
        uiStateActions_setSettingsOpen={props.uiState_setSettingsOpen}
        uiStateActions_setServicesListOpen={props.uiStateActions_setServicesListOpen}
    
        source_sources={props.source_sources}
    
        search_queryGenes={props.search.queryGenes}
        search_results={props.search.results}
        searchActions_clearAll={props.searchActions_clearAll}
        searchActions_searchStarted={props.searchActions_searchStarted}
    
        networkActions_networkClear={props.networkActions_networkClear}
    
        cyrestActions_setPort={props.cyrestActions_setPort}

        history_location_search={props.history.location.search}
      >
        <LoadingPanel title="Loading Results..." />
      </AppShell>
    )
  }

  return (
    <AppShell 
      uiState_servicesListOpen={props.uiState_servicesListOpen}
      uiState_isSettingsOpen={props.uiState_isSettingsOpen}
      uiStateActions_setSettingsOpen={props.uiState_setSettingsOpen}
      uiStateActions_setServicesListOpen={props.uiStateActions_setServicesListOpen}

      source_sources={props.source_sources}

      search_queryGenes={props.search.queryGenes}
      search_results={props.search.results}
      searchActions_clearAll={props.searchActions_clearAll}
      searchActions_searchStarted={props.searchActions_searchStarted}

      networkActions_networkClear={props.networkActions_networkClear}

      cyrestActions_setPort={props.cyrestActions_setPort}

      history_location_search={props.history.location.search}
    >
      <div className="container">
        <Results
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
          cyrestActions_importNetworkStarted={props.cyrest_importNetworkStarted}
    
          uiState_zoomed={props.uiState_zoomed}
          uiState_highlights={props.uiState_highlights}
          uiState_selectedSource={props.uiState_selectedSource}
          uiState_sortOrder={props.uiState_sortOrder}
          uiStateActions_setServicesListOpen={props.uiStateActions_setServicesListOpen}
          uiStateActions_setZoomed={props.uiStateActions_setZoomed}
          uiStateActions_setHighlights={props.uiStateActions_setHighlights}
          uiStateActions_clearSelectedGenes={props.uiStateActions_clearSelectedGenes}
          uiStateActions_setSelectedSource={props.uiStateActions_setSelectedSource}
          uiStateActions_setSortOrder={props.uiStateActions_setSortOrder}
    
          network={props.network}
          networkActions_changeTab={props.networkActions_changeTab}
          networkActions_selectNodes={props.networkActions_selectNodes}
          networkActions_unselectNodes={props.networkActions_unselectNodes}
          networkActions_selectEdges={props.networkActions_selectEdges}
          networkActions_unselectEdges={props.networkActions_unselectEdges}
          networkActions_changeListIndex={props.networkActions_changeListIndex}
          networkActions_networkFetchStarted={props.networkActions_networkFetchStarted}
          networkActions_networkClear={props.networkActions_networkClear}
          
          search={props.search}
          searchActions_clearSelectedGenes={props.searchActions_clearSelectedGenes}
          searchActions_setActualResults={props.searchActions_setActualResults}
    
          source_sources={props.source_sources}

          cyrestActions_importNetworkStarted={props.cyrestActions_importNetworkStarted}
          cyrestActions_setPort={props.cyrestActions_setPort}

          history={props.history}
        />
        <InputPanel
          search_results={props.search.results}
          search_selectedGenes={props.search.selectedGenes}
          searchActions_clearSelectedGenes={props.searchActions_clearSelectedGenes}
          searchActions_setSelectedGenes={props.searchActions_setSelectedGenes}

          network_hitGenes={props.network.hitGenes}
        />
      </div>
    </AppShell>
  )
}

export default HomePanel
