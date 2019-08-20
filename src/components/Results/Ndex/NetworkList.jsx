import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'

import MenuList from '@material-ui/core/MenuList'
import Typography from '@material-ui/core/Typography'


import './style.css'
import Sorter from './Sorter'

const styles = theme => ({
  inline: {
    display: 'inline'
  },
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em'
  },
  networkAvatar: {
    margin: 5,
    color: '#fff',
    backgroundColor: '#FAFAFA'
  },
  menuItem: {
    '&:focus': {
      backgroundColor: 'rgba(230,230,230,0.6)'
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
  },
  noPadding: {
    paddingTop: '0',
    paddingBottom: '0',
  },
  center: {
    justifyContent: 'center',
    position: 'relative',
    top: '25%',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
})

const NetworkList = props => {
  const { classes, hits, renderNetworkListItem, network, search } = props

  if (!hits) {
    return <div className="network-list-wrapper" />
  }

  let index = 1

  function handleListItemClick(event, index) {
    props.networkActions.changeListIndex(index);
  }

  const selectedIndex = network.listIndex

  const query = search.results.genes
  const result = hits.map(entry => renderNetworkListItem(
    query.size, 
    entry, 
    classes, 
    handleListItemClick, 
    selectedIndex, 
    index++))

  if (result.length > 0) {
    return (
      <div className="network-list-wrapper">
        <div className="network-list">
          <MenuList className={classes.noPadding}>
            {result}
          </MenuList>
        </div>
      </div>
    )
  } else {
    return (
      <div className="network-list-wrapper">
        <div className="network-list">
          <Typography 
            variant={'subtitle1'}
            color={'textSecondary'}
            className={classes.center}
          >
            No results found
          </Typography>
        </div>
      </div>
    )
  }

}

export default withStyles(styles)(NetworkList)
