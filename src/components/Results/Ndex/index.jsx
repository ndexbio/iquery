import React from 'react'
import './style.css'

import Split from 'react-split'
import NetworkView from './NetworkView'
import NetworkList from './NetworkList'

import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import * as cyRESTApi from '../../../api/cyrest'
import { ListItem } from '@material-ui/core'

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

  const checkCytoscapeConnection = props => {
    cyRESTApi
      .status(props.cyrest.port)
      .catch(e => {
        throw Error(e)
      })
      .then(res => handleErrors(res))
      .then(running => {
        props.cyrestActions.setAvailable(true)
      })
      .catch(error => {
        props.cyrestActions.setAvailable(false)
      })
  }

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
    checkCytoscapeConnection(props)

    // Reset the UI state (hilight)
    props.uiStateActions.setHighlights(false)

    // Reset selection
    props.searchActions.setSelectedGenes([])

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
  }

  const handleImportNetwork = () => {
    props.cyrestActions.importNetworkStarted(props.network.originalCX)
  }

  const renderNetworkListItem = (querySize, networkEntry, classes) => {
    const {
      description,
      networkUUID,
      nodes,
      edges,
      imageURL,
      hitGenes
    } = networkEntry

    return (
      <ListItem
        button
        className={classes.menuItem}
        key={networkUUID}
        onClick={val =>
          handleFetch(networkUUID, description, nodes, edges, hitGenes)
        }
      >
        <ListItemAvatar>
          <Avatar className={classes.networkAvatar} src={imageURL} />
        </ListItemAvatar>
        <ListItemText
          primary={description}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                className={classes.inline}
              >
                {'Nodes: ' + nodes + ', Edges: ' + edges}
              </Typography>
              {'  Hit/Query = ' + hitGenes.length + '/' + querySize}
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
