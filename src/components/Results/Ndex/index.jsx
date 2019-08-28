import React from 'react'
import './style.css'
import {connect} from 'react-redux'

import Split from 'react-split'

import NetworkView from './NetworkView'
import NetworkList from './NetworkList'

import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import { ListItem } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import {clearSelectedGenes} from '../../../actions/search'
import {networkFetchStarted} from '../../../actions/network'
import {setHighlights} from '../../../actions/uiState'
import {importNetworkStarted} from '../../../actions/cyrest'

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
      cx: props.network_originalCX,
      source: props.network_sourceId,
      uuid: props.network_uuid
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
      />
      <NetworkView 
        handleImportNetwork={handleImportNetwork} 
      />
    </Split>
  )
}

const mapStateToProps = state => {
  return {
    uiState_selectedSource: state.uiState.selectedSource,
    network_originalCX: state.network.originalCX,
    network_sourceId: state.network.sourceId,
    network_uuid: state.network.uuid,
    search_results: state.search.results,
    search_queryList: state.search.queryList,
    search_searchResults: state.search.searchResults
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchActions_clearSelectedGenes: () => dispatch(clearSelectedGenes()),
    networkActions_networkFetchStarted: (payload) => dispatch(networkFetchStarted(payload)),
    cyrestActions_importNetworkStarted: (payload) => dispatch(importNetworkStarted(payload)),
    uiStateActions_setHighlights: (payload) => dispatch(setHighlights(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ndex)
