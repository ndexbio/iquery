import React, { useEffect } from 'react'

import { withStyles } from '@material-ui/core/styles'

import MenuList from '@material-ui/core/MenuList'
import Typography from '@material-ui/core/Typography'

import SortPanel from './SortPanel'
import { orderBy } from 'lodash'

import './style.css'

import { cloneDeep } from 'lodash'

const styles = (theme) => ({
  inline: {
    display: 'inline',
  },
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em',
  },
  networkAvatar: {
    margin: 5,
    color: '#fff',
    backgroundColor: '#FAFAFA',
  },
  menuItem: {
    '&:focus': {
      backgroundColor: 'rgba(230,230,230,0.6)',
    },
  },
  menuText: {
    '&:focus': {},
  },
  secondary: {
    width: '15em',
    display: 'flex',
    alignItems: 'center',
    padding: '0.2em',
  },
  plot: {
    width: '80%',
    background: 'teal',
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
    height: '100%',
  },
})

const pvalSort = (hit) => hit.details.PValue
const similaritySort = (hit) => hit.details.similarity
const overlapSort = (hit) => hit.hitGenes.length
const titleSort = (hit) => hit.description

const sortFns = {
  // sort by pvalue asc, overlap desc, alphabetically asc
  'p-Value': (hits) => orderBy(hits, [pvalSort, overlapSort, titleSort], ['asc', 'desc', 'asc']),
  // sort by similarity desc,  pvalue asc, overlap desc, alphabetically asc
  Similarity: (hits) =>
    orderBy(hits, [similaritySort, pvalSort, overlapSort, titleSort], ['desc', 'asc', 'desc', 'asc']),
  // sort by overlap desc, alphabetically asc
  Overlap: (hits) => orderBy(hits, [overlapSort, titleSort], ['desc', 'asc']),
}

const NetworkList = (props) => {
  let hits = props.hits

  const openFirst = (first) => {
    if (first != null) {
      props.handleFetch(first.networkUUID, first.description, first.nodes, first.edges, first.hitGenes, first.legendURL)
      if (first.url != null) {
        props.networkActions.setOriginalNetworkUrl('https://' + first.url)
      }
    } else {
      props.networkActions.networkClear()
    }
  }

  //Adjust p-values
  useEffect(() => {
    if (props.uiState.selectedSource === 'enrichment' && hits != null && hits[0] != null) {
      hits = sortFns['p-Value'](hits)

      // legacy code that used to adjust p-values on the client side
      // Feb-Mar 2022: Chris changed this to adjust them on the server side
      // const networkCount = hits[0].details.totalNetworkCount;
      // for (let i = 0; i < hits.length; i++) {
      //   hits[i].details.PValue =
      //     (hits[i].details.PValue * networkCount) / (i + 1);
      // }
    }
  }, [hits])

  //Sort hits
  useEffect(() => {
    if (hits !== null) {
      const firstHit = cloneDeep(hits[0])
      if (props.uiState.selectedSource === 'enrichment') {
        //Allow stable sorting
        for (let i = 0; i < hits.length; i++) {
          hits[i].rank = i
        }

        hits = sortFns[props.uiState.sortBy](hits)
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

      if (!opened && (props.network.listIndex !== 1 || firstHit.description !== hits[0].description)) {
        openFirst(hits[0])
        props.networkActions.changeListIndex(1)
      } else {
        // refs UD-2170
        // changing sort should sort the results and
        // open the first network in the new results list
        openFirst(hits[0])
      }
    }
  }, [props.uiState.sortBy, props.uiState.selectedSource])

  if (!hits || props.search.actualResults.length === 0) {
    return (
      <div className="network-list-wrapper">
        <div className="network-list">
          <Typography variant={'subtitle1'} color={'textSecondary'} className={props.classes.center}>
            No results found
          </Typography>
        </div>
      </div>
    )
  }

  let index = 1

  function handleListItemClick(event, index, legendUrl) {
    props.networkActions.changeListIndex(index)
    props.networkActions.changeLegendUrl(legendUrl)
    props.uiStateActions.setPathwayFigure(true)
  }

  const selectedIndex = props.network.listIndex
  const hideSearchBar = props.uiState.hideSearchBar

  return (
    <div className={hideSearchBar ? 'headerless-network-list-wrapper' : 'network-list-wrapper'}>
      {props.uiState.selectedSource !== 'protein-interactions' ? <SortPanel {...props} /> : null}
      {props.search.actualResults.map((entry) => {
        return props.renderNetworkListItem(
          props.search.queryList.length,
          entry,
          props.classes,
          handleListItemClick,
          selectedIndex,
          index++,
        )
      })}
    </div>
  )
}

export default withStyles(styles)(NetworkList)
