import React, { useEffect } from 'react'

import { withStyles } from '@material-ui/core/styles'

import MenuList from '@material-ui/core/MenuList'
import Typography from '@material-ui/core/Typography'

import SortPanel from './SortPanel'

import './style.css'

import { cloneDeep } from 'lodash'

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
    paddingBottom: '0'
  },
  center: {
    justifyContent: 'center',
    position: 'relative',
    top: '25%',
    display: 'flex',
    width: '100%',
    height: '100%'
  }
})

const findSort = sortBy => {
  if (sortBy === 'p-Value') {
    return (a, b) => {
      if (a.details.PValue > b.details.PValue) {
        return 1
      } else if (a.details.PValue < b.details.PValue) {
        return -1
      } else {
        if (a.rank > b.rank) {
          return 1
        } else {
          return -1
        }
      }
    }
  } else if (sortBy === 'Similarity') {
    return (a, b) => {
      if (a.details.similarity < b.details.similarity) {
        return 1
      } else if (a.details.similarity > b.details.similarity) {
        return -1
      } else {
        if (a.rank > b.rank) {
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
        if (a.rank > b.rank) {
          return 1
        } else {
          return -1
        }
      }
    }
  }
}

const NetworkList = props => {
  let hits = props.hits

  const openFirst = first => {
    if (first != null) {
      props.handleFetch(
        first.networkUUID,
        first.description,
        first.nodes,
        first.edges,
        first.hitGenes
      )
    }
  }

  //Sort hits
  useEffect(() => {
    const firstHit = cloneDeep(hits[0])
    if (props.uiState.selectedSource === 'enrichment') {
      const sortFunction = findSort(props.uiState.sortBy)

      //Allow stable sorting
      for (let i = 0; i < hits.length; i++) {
        hits[i].rank = i
      }

      hits = hits.sort(sortFunction)
    }
    //Check if you need to rerender first hit
    let opened = false
    if (props.search.actualResults.length === 0) {
      opened = true
      props.searchActions.setActualResults(hits)
      openFirst(hits[0])
      props.networkActions.changeListIndex(1)
    } else {
      props.searchActions.setActualResults(hits)
    }

    if (
      !opened &&
      (props.network.listIndex !== 1 ||
        firstHit.description !== hits[0].description)
    ) {
      openFirst(hits[0])
      props.networkActions.changeListIndex(1)
    }
  }, [props.uiState.sortBy, props.uiState.selectedSource])

  if (!hits) {
    return <div className="network-list-wrapper" />
  }

  let index = 1

  function handleListItemClick(event, index) {
    props.networkActions.changeListIndex(index)
  }

  const selectedIndex = props.network.listIndex

  let enrichmentStyle
  if (props.uiState.selectedSource === 'enrichment') {
    enrichmentStyle = {
      height: 'calc(100% - 49px)'
    }
  } else {
    enrichmentStyle = {}
  }

  if (props.search.actualResults.length > 0) {
    return (
      <div className="network-list-wrapper">
        <SortPanel {...props} />
        <div className="network-list" style={enrichmentStyle}>
          <MenuList className={props.classes.noPadding}>
            {props.search.actualResults.map(entry =>
              props.renderNetworkListItem(
                props.search.queryList.length,
                entry,
                props.classes,
                handleListItemClick,
                selectedIndex,
                index++
              )
            )}
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
