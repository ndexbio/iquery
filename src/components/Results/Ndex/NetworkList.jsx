import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'

import MenuList from '@material-ui/core/MenuList'
import Typography from '@material-ui/core/Typography'

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ListItem } from '@material-ui/core'

import SortPanel from './SortPanel'



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

const findSort = (sortOrder, pValue, overlap) => {
  if (pValue && (!overlap || sortOrder[0] === 'p-Value')) {
    return (a, b) => {
      if (a.details.PValue > b.details.PValue) {
        return 1
      } else if (a.details.PValue < b.details.PValue) {
        return -1
      } else {
        if (a.hitGenes.length < b.hitGenes.length) {
          return 1
        } else {
          return -1
        }
      }
    }
  } else {
    return (a, b) => {
      if (a.hitGenes.length < b.hitGenes.length) {
        return 1
      } else if (a.hitGenes.length > b.hitGenes.length) {
        return -1
      } else {
        if (a.details.PValue > b.details.PValue) {
          return 1
        } else {
          return -1
        }
      }
    }
  }
}

const NetworkList = props => {
  const { classes, hits, renderNetworkListItem, network, search, uiState, uiStateActions, searchActions } = props

  if (!hits) {
    return <div className="network-list-wrapper" />
  }

  let index = 1

  function handleListItemClick(event, index) {
    props.networkActions.changeListIndex(index);
  }

  const selectedIndex = network.listIndex

  const query = search.results.genes

  //Sort hits
  if (uiState.sort) {
    const sortOrder = uiState.sortOrder
    const sortFunction = findSort(uiState.sortOrder, uiState.sortPValueOn, uiState.sortOverlapOn)
    let newHits = hits.sort(sortFunction)
    //Check threshold
    if (uiState.sortPValueThresholdOn) {
      const pValueThreshold = uiState.sortPValueThresholdValue
      newHits = []
      hits.forEach((hit) => {
        if (hit.details.PValue <= pValueThreshold) {
          newHits.push(hit)
        }
      })
    }
    if (uiState.sortOverlapThresholdOn) {
      const overlapThreshold = uiState.sortOverlapThresholdValue
      let newNewHits = []
      newHits.forEach(hit => {
        if (hit.hitGenes.length >= overlapThreshold) {
          newNewHits.push(hit)
        }
      })
      newHits = newNewHits
    }
    searchActions.setActualResults(newHits)
    uiStateActions.setSort(false)
  }

  const result = search.actualResults.map(entry => renderNetworkListItem(
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
            <SortPanel {...props}/>
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
