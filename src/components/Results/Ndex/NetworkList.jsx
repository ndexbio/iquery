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

import './style.css'

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
  }
})

const NetworkList = props => {
  const { classes } = props

  console.log('SEARCH=======', props)
  const results = props.search.results

  if (!results) {
    return <div className="network-list-wrapper" />
  }

  const networkList = results.ndex.networks
  if (!networkList) {
    return <div className="network-list-wrapper" />
  }

  return (
    <div className="network-list-wrapper">
      <div className="network-list">
        <List>{networkList.map(entry => getListItem(entry, classes))}</List>
      </div>
    </div>
  )
}

const getListItem = (geneEntry, classes) => {
  return (
    <ListItem alignItems="flex-start" key={geneEntry.externalId}>
      <ListItemAvatar>
        <Avatar className={classes.networkAvatar}>N</Avatar>
      </ListItemAvatar>
      <ListItemText
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
        <IconButton aria-label="Delete">
          <LinkIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default withStyles(styles)(NetworkList)
