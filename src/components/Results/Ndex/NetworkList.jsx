import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import LinkIcon from '@material-ui/icons/Launch'

import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import deepOrange from '@material-ui/core/colors/deepOrange'

import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'

import Tooltip from '@material-ui/core/Tooltip'

import lightGreen from '@material-ui/core/colors/lightGreen'

import './style.css'
import Sorter from './Sorter'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries,
  HorizontalBarSeriesCanvas
} from 'react-vis'
import BarSeries from 'react-vis/es/plot/series/bar-series'

const NDEX_LINK_URL = 'http://www.ndexbio.org/#/network/'

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
    backgroundColor: deepOrange[500]
  },
  menuItem: {
    height: '4em',
    '&:focus': {
      backgroundColor: 'rgba(200,205,200,0.5)',
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  menuText: {
    '&:focus': {
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
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

const CYTOSCAPE_URL = 'http://localhost:2607/status/'

const checkCytoscapeConnection = (props) => {
  fetch(CYTOSCAPE_URL, { mode: 'no-cors' })
    .catch(e => {
      throw Error(e)
    })
    .then(res => handleErrors(res))
    .then(running => {
      console.log('8888888888888888888888', running)
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
  const handleFetch = (uuid, networkName) => {
    checkCytoscapeConnection(props)
    props.networkActions.networkFetchStarted({ uuid, networkName })
  }

  const getListItem = (geneEntry, classes) => {
    const dummyOverlap = Math.random() * 100

    return (
      <MenuItem
        className={classes.menuItem}
        alignItems="flex-start"
        key={geneEntry.externalId}
        onClick={val => handleFetch(geneEntry.externalId, geneEntry.name)}
      >
        <ListItemAvatar>
          <Avatar className={classes.networkAvatar}>N</Avatar>
        </ListItemAvatar>
        <ListItemText
          className={classes.menuText}
          primary={geneEntry.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                className={classes.inline}
                color="textPrimary"
              >
                {'Nodes: ' +
                  geneEntry.nodeCount +
                  ', Edges: ' +
                  geneEntry.edgeCount}
              </Typography>
              <Typography variant="caption">
                {'UUID: ' + geneEntry.externalId}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction className={classes.secondary}>
          <Tooltip title="Open in NDEx" placement="bottom">
            <IconButton
              href={NDEX_LINK_URL + geneEntry.externalId}
              target={'_blank'}
              aria-label="Open in NDEx"
            >
              <LinkIcon />
            </IconButton>
          </Tooltip>
          <div
            style={{
              background: 'lightGreen',
              color: 'white',
              height: '2em',
              width: dummyOverlap + '%'
            }}
          >
            <Typography variant="h6">
              {dummyOverlap.toFixed(1) + '%'}
            </Typography>
          </div>
        </ListItemSecondaryAction>
      </MenuItem>
    )
  }

  const { classes } = props
  const results = props.ndexResults

  if (!results) {
    return <div className="network-list-wrapper" />
  }

  const networkList = results.networks
  if (!networkList) {
    return <div className="network-list-wrapper" />
  }

  return (
    <div className="network-list-wrapper">
      <Sorter />
      <div className="network-list">
        <MenuList>
          {networkList.map(entry => getListItem(entry, classes))}
        </MenuList>
      </div>
    </div>
  )
}

export default withStyles(styles)(NetworkList)
