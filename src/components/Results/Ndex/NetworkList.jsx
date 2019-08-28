import React, { useEffect } from 'react'
import {connect} from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import MenuList from '@material-ui/core/MenuList'
import Typography from '@material-ui/core/Typography'

import SortPanel from './SortPanel'

import {setActualResults} from '../../../actions/search'
import {changeListIndex} from '../../../actions/network'

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

const findSort = (sortOrder) => {
  if (sortOrder[0] === 'p-Value') {
    console.log('p-Value')
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
    console.log('overlap')
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
  
  const openFirst = (first) => {
    if (first != null) {
      console.log(first)
      props.handleFetch(first.networkUUID, first.description, first.nodes, first.edges, first.hitGenes)
    }
  }

  //Sort hits
  useEffect(() => {
    const sortFunction = findSort(props.uiState_sortOrder)
    console.log(props.uiState_sortOrder)
    const newHits = hits.sort(sortFunction)
    props.searchActions_setActualResults(newHits)
    openFirst(newHits[0])
    props.networkActions_changeListIndex(1)
  }, [props.uiState_sortOrder, props.uiState_selectedSource])

  useEffect(() => {
    //Open first hit
    openFirst()
  }, [props.uiState_selectedSource])
  
  if (!hits) {
    return <div className="network-list-wrapper" />
  }

  let index = 1

  function handleListItemClick(event, index) {
    props.networkActions_changeListIndex(index);
  }

  const selectedIndex = props.network_listIndex

  const query = props.search_results_genes

  /*const result = props.search_actualResults.map(entry => props.renderNetworkListItem(
    query.size, 
    entry, 
    props.classes, 
    handleListItemClick, 
    selectedIndex, 
    index++))
*/

  if (props.search_actualResults.length > 0) {
    return (
      <div className="network-list-wrapper">
        <SortPanel />
        <div className="network-list">
          <MenuList className={props.classes.noPadding}>
            {props.search_actualResults.map(entry => props.renderNetworkListItem(
              query.size, 
              entry, 
              props.classes, 
              handleListItemClick, 
              selectedIndex, 
              index++
              ))
            }
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

const mapStateToProps = state => {
  return {
    uiState_sortOrder: state.uiState.sortOrder,
    uiState_selectedSource: state.uiState.selectedSource,

    network_listIndex: state.network.listIndex,
    
    search_results_genes: state.search.results.genes,
    search_actualResults: state.search.actualResults,

    //Necessary to make sure component updates when order of actualResults changes
    search_actualResults_0: state.search.actualResults[0]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchActions_setActualResults: (payload) => dispatch(setActualResults(payload)),
    networkActions_changeListIndex: (payload) => dispatch(changeListIndex(payload))
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
) (withStyles(styles)(NetworkList))
