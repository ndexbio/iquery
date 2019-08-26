import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Empty from './Empty'
import TabContent from './TabContent'

const styles = theme => ({
  tabs: {
    width: '100%',
    backgroundColor: '#FFFFFF'
  }
})

const Results = props => {
  // For tab selection
  const [idx, setSelectedTabIndex] = useState(0)

  useEffect(() => {
    updateHistory(0)
  }, [])

  const handleChange = (event, idx) => {
    setSelectedTabIndex(idx)
    updateHistory(idx)
    props.networkActions_networkClear()
    props.networkActions_changeListIndex(0)
  }

  const updateHistory = newValue => {
    // Update URL
    const results = props.search.results
    if (results === null || results === undefined) {
      return
    }

    const jobId = results.jobId
    const searchResults = props.search.searchResults
    if (searchResults !== undefined && searchResults !== null) {
      const sourceName = getSourceName(sources, newValue)
      console.log('** Tab change:', jobId, sourceName)
      props.uiStateActions_setSelectedSource(sourceName)
      props.history.push(`/${jobId}/${sourceName}`)
    }
  }

  // Source list is not available.  Just return empty result
  const sources = props.source_sources
  if (sources === null || sources === undefined) {
    return <Empty />
  }

  const { searchResults } = props.search
  const selectedSourceName = getSourceName(sources, idx)

  const results = findResult(selectedSourceName, searchResults)


  // Get current tab selection
  return (
    <div className="results-container">
      <div className="results-wrapper">
        <Tabs value={idx} onChange={handleChange}>
          {sources.map(source => (
            <Tab key={source.uuid} label={source.name === "enrichment" ? "Gene Enrichment" : 
                                          source.name === "interactome" ? "Gene Neighborhood" : source.name} />
          ))}
        </Tabs>
        <TabContent 
          results={results}

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
          uiStateActions_setZoomed={props.uiStateActions_setZoomed}
          uiStateActions_setHighlights={props.uiStateActions_setHighlights}
          uiStateActions_clearSelectedGenes={props.uiStateActions_clearSelectedGenes}
          uiStateActions_setSortOrder={props.uiStateActions_setSortOrder}
    
          network={props.network}
          networkActions_changeTab={props.networkActions_changeTab}
          networkActions_selectNodes={props.networkActions_selectNodes}
          networkActions_unselectNodes={props.networkActions_unselectNodes}
          networkActions_selectEdges={props.networkActions_selectEdges}
          networkActions_unselectEdges={props.networkActions_unselectEdges}
          networkActions_changeListIndex={props.networkActions_changeListIndex}
          networkActions_networkFetchStarted={props.networkActions_networkFetchStarted}
    
          search_results={props.search.results}
          search_queryList={props.search.queryList}
          search_actualResults={props.search.actualResults}
          search_searchResults={props.search.searchResults}
          search_selectedGenes={props.search.selectedGenes}
          searchActions_clearSelectedGenes={props.searchActions_clearSelectedGenes}
          searchActions_setActualResults={props.searchActions_setActualResults}
    
          source_sources={props.source_sources}

          cyrestActions_importNetworkStarted={props.cyrestActions_importNetworkStarted}
          cyrestActions_setPort={props.cyrestActions_setPort}

          history={props.history}
        />
      </div>
    </div>
  )
}

const getSourceName = (sources, idx) => {
  return sources[idx].name
}

const findResult = (sourceName, results) => {
  if (results === null || results === undefined) {
    return null
  }

  const resultArray = results.sources

  let idx = resultArray.length

  while (idx--) {
    const currentResult = resultArray[idx]
    if (currentResult.sourceName === sourceName) {
      return currentResult
    }
  }
  return null
}

export default withStyles(styles)(Results)
