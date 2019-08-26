import React from 'react'
import './style.css'

import Split from 'react-split'

import NetworkView from './NetworkView'
import NetworkList from './NetworkList'

import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import { ListItem } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'



const NETWORK_SIZE_TH = 5000

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Ndex = props => {
  const geneList = props.search_queryList

  const sourceUUID = props.sourceUUID

  const id = props.search_results.jobId

  const handleErrors = res => {
    if (res !== undefined) {
      return true
    }
    return false
  }

  const handleFetch = (
    networkUUID,
    networkName,
    nodeCount,
    edgeCount,
    hitGenes
  ) => {
    //checkCytoscapeConnection(props)

    // Reset selection
    props.searchActions_clearSelectedGenes()

    props.networkActions_networkFetchStarted({
      id,
      sourceUUID,
      networkUUID,
      networkName,
      geneList,
      hitGenes,
      nodeCount,
      edgeCount
    })
    updateHistory(networkUUID)
  }

  const updateHistory = networkUUID => {
    // Update URL
    const jobId = props.search_results.jobId
    const searchResults = props.search_searchResults
    const sourceName = props.uiState_selectedSource

    if (searchResults !== undefined && searchResults !== null) {
      console.log('** network changed:', jobId, sourceName)
      props.history.push(`/${jobId}/${sourceName}/${networkUUID}`)
    }
  }

  const handleImportNetwork = () => {
    // Reset the UI state (hilight)
    props.uiStateActions_setHighlights(true)

    props.cyrestActions_importNetworkStarted({
      cx: props.network.originalCX,
      source: props.network.sourceId,
      uuid: props.network.uuid
    })
  }

  const renderNetworkListItem = (querySize, networkEntry, classes, handleListItemClick, selectedIndex, index) => {
    const {
      description,
      networkUUID,
      nodes,
      edges,
      imageURL,
      hitGenes,
      rank,
      details
    } = networkEntry

    // console.log('Entry:', networkEntry)

    const topDescription = 
      'N: ' +
      nodes + 
      ', E: ' +
      edges
      
    const bottomDescription1 = 
      'Hit/Query = ' +
      hitGenes.length +
      '/' +
      querySize

    let bottomDescription2 = ''
    const pVal = details.PValue
    if (pVal !== undefined) {
      let pValText = pVal.toExponential(5)
      if (pVal === 0) {
        pValText = 0
      }
      bottomDescription2 = 'P-value = ' + pValText
    }

    return (
      //<MenuItem>
      <ListItem
        button
        className={classes.menuItem}
        key={networkUUID}
        onClick={event => {
          handleFetch(networkUUID, description, nodes, edges, hitGenes)
          handleListItemClick(event, index)
        }}
        selected={selectedIndex === index}
      >
        <ListItemIcon>
          <img className="list-icon" src={imageURL} />
        </ListItemIcon>
        <ListItemText
          primary={
            <React.Fragment>
              
              <div className={classes.listTitle}>
                {description}
              </div>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Tooltip title="Number of nodes and edges" placement="bottom">
                <Typography component="span" variant="caption" color="textSecondary">
                  {topDescription}
                </Typography>
              </Tooltip>
              <div>
                <Typography component="span" variant={'caption'}>
                  {bottomDescription1}
                </Typography>
                </div>
              <div>
                <Typography component="span" variant={'caption'}>
                  {bottomDescription2}
                </Typography>
              </div>
            </React.Fragment>
          }
        />
        </ListItem>
    )
  }

  return (
    <Split sizes={[35, 65]} gutterSize={7} className="ndex-base">
      <NetworkList 
        renderNetworkListItem={renderNetworkListItem} 
        hits={props.hits}
  
        uiState_selectedSource={props.uiState_selectedSource}
        uiState_sortOrder={props.uiState_sortOrder}
        uiStateActions_setSortOrder={props.uiStateActions_setSortOrder}
 
        network_listIndex={props.network.listIndex}
        networkActions_changeListIndex={props.networkActions_changeListIndex}
  
        search_results_genes={props.search_results.genes}
        search_actualResults={props.search_actualResults}
        searchActions_setActualResults={props.searchActions_setActualResults}
      />
      <NetworkView 
        handleImportNetwork={handleImportNetwork} 

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
  
        uiState_zoomed={props.uiState_zoomed}
        uiState_highlights={props.uiState_highlights}
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

        search_results={props.search_results}
      />
    </Split>
  )
}

export default Ndex
