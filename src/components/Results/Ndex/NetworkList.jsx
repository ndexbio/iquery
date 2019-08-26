import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'

import MenuList from '@material-ui/core/MenuList'
import Typography from '@material-ui/core/Typography'

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
  if (sortOrder[0] === 'p-Value') {
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
  const hits = props.hits

  //Sort hits
  useEffect(() => {
    const sortFunction = findSort(props.uiState_sortOrder)
    const newHits = hits.sort(sortFunction)
    props.searchActions_setActualResults(newHits)
  }, [props.uiState_sortOrder, props.uiState_selectedSource])
  
  if (!hits) {
    return <div className="network-list-wrapper" />
  }

  let index = 1

  function handleListItemClick(event, index) {
    props.networkActions_changeListIndex(index);
  }

  const selectedIndex = props.network_listIndex

  const query = props.search_results_genes

  

  const result = props.search_actualResults.map(entry => props.renderNetworkListItem(
    query.size, 
    entry, 
    props.classes, 
    handleListItemClick, 
    selectedIndex, 
    index++))

  if (result.length > 0) {
    return (
      <div className="network-list-wrapper">
        <SortPanel
          uiState_selectedSource={props.uiState_selectedSource}
          uiStateActions_setSortOrder={props.uiStateActions_setSortOrder}
        />
        <div className="network-list">
          <MenuList className={props.classes.noPadding}>
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
            className={props.classes.center}
          >
            No results found
          </Typography>
        </div>
      </div>
    )
  }

}

export default withStyles(styles)(NetworkList)
