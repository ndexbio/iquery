import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'


import MenuList from '@material-ui/core/MenuList'

import * as cyRESTApi from '../../../api/cyrest'
import './style.css'
import Sorter from './Sorter'
import ListItem from '@material-ui/core/ListItem'
import MenuItem from '@material-ui/core/MenuItem'

const NETWORK_SIZE_TH = 5000

const styles = theme => ({
  inline: {
    display: 'inline'
  },
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em'
  },
  networkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#FAFAFA'
  },
  menuItem: {
    height: '4em',
    '&:focus': {
      backgroundColor: 'rgba(200,205,200,0.5)'
    }
  },
  menuText: {
    '&:focus': {}
  },
  secondary: {
    width: '15em',
    display: 'flex',
    alignItems: 'center',
    padding: '0.2em'
  },
  plot: {
    width: '80%',
    background: 'teal'
  }
})

const checkCytoscapeConnection = props => {
  console.log(props.uiState.urlParams)
  cyRESTApi
    .status(
      props.uiState.urlParams.has('cyrestport')
        ? props.uiState.urlParams.get('cyrestport')
        : 1234
    )
    .catch(e => {
      throw Error(e)
    })
    .then(res => handleErrors(res))
    .then(running => {
      props.uiStateActions.setCytoscapeStatus(true)
    })
    .catch(error => {
      props.uiStateActions.setCytoscapeStatus(false)
    })
}

const handleErrors = res => {
  console.log('Calling!!', res)
  if (res !== undefined) {
    return true
  }

  return false
}

const NetworkList = props => {
  const { classes, hits, renderNetworkListItem, network } = props

  if (!hits) {
    return <div className="network-list-wrapper" />
  }

  return (
    <div className="network-list-wrapper">
      <Sorter />

      <div className="network-list">
        <MenuList>
          {hits.map(entry => renderNetworkListItem(entry, classes))}
        </MenuList>
      </div>
    </div>
  )
}

export default withStyles(styles)(NetworkList)
