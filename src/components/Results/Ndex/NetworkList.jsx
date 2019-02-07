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

import './style.css'

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
      backgroundColor: theme.palette.primary.light,
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
  }
})

const NetworkList = props => {

  const handleFetch = uuid => {
    console.log('@@@@@@@@@@UUID;', uuid)
    props.networkActions.networkFetchStarted(uuid)
  }

  const getListItem = (geneEntry, classes) => {
    return (
      <MenuItem
        className={classes.menuItem}
        alignItems="flex-start"
        key={geneEntry.externalId}
        onClick={val => handleFetch(geneEntry.externalId)}
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
        <ListItemSecondaryAction>
          <Tooltip title="Open in NDEx" placement="bottom">
            <IconButton
              href={NDEX_LINK_URL + geneEntry.externalId}
              target={'_blank'}
              aria-label="Open in NDEx"
            >
              <LinkIcon />
            </IconButton>
          </Tooltip>
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
      <div className="network-list">
        <MenuList>
          {networkList.map(entry => getListItem(entry, classes))}
        </MenuList>
      </div>
    </div>
  )
}


export default withStyles(styles)(NetworkList)
