import React from 'react'
import './style.css'

import Split from 'react-split'
import NetworkView from './NetworkView'
import NetworkList from './NetworkList'

import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import Typography from '@material-ui/core/Typography'

import * as cyRESTApi from '../../../api/cyrest'
import { ListItem } from '@material-ui/core'

import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem';



const NETWORK_SIZE_TH = 5000

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Ndex = props => {
  const geneList = props.search.queryList

  const sourceUUID = props.sourceUUID

  const id = props.search.results.jobId

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
    props.searchActions.clearSelectedGenes()

    props.networkActions.networkFetchStarted({
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
    const jobId = props.search.results.jobId
    const searchResults = props.search.searchResults
    const sourceName = props.uiState.selectedSource

    if (searchResults !== undefined && searchResults !== null) {
      console.log('** network changed:', jobId, sourceName)
      props.history.push(`/${jobId}/${sourceName}/${networkUUID}`)
    }
  }

  const handleImportNetwork = () => {
    // Reset the UI state (hilight)
    props.uiStateActions.setHighlights(true)

    props.cyrestActions.importNetworkStarted({
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
      <NetworkList renderNetworkListItem={renderNetworkListItem} {...props} />
      <NetworkView handleImportNetwork={handleImportNetwork} {...props} />
    </Split>
  )
}

export default Ndex
