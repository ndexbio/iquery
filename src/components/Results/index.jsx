import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Empty from './Empty'
import TabContent from './TabContent'

import {networkClear, changeListIndex} from '../../actions/network'
import {setSelectedSource} from '../../actions/uiState'

const styles = theme => ({
  tabs: {
    width: '100%',
    backgroundColor: '#FFFFFF'
  }
})

const Results = props => {
  // For tab selection
  const [idx, setSelectedTabIndex] = useState(0)

  useEffect(() => {
    updateHistory(0)
  }, [])

  const handleChange = (event, idx) => {
    setSelectedTabIndex(idx)
    updateHistory(idx)
    props.networkActions_networkClear()
    props.networkActions_changeListIndex(0)
  }

  const updateHistory = newValue => {
    // Update URL
    const results = props.search_results
    if (results === null || results === undefined) {
      return
    }

    const jobId = results.jobId
    const searchResults = props.search_searchResults
    if (searchResults !== undefined && searchResults !== null) {
      const sourceName = getSourceName(sources, newValue)
      console.log('** Tab change:', jobId, sourceName)
      props.uiStateActions_setSelectedSource(sourceName)
      props.history.push(`/${jobId}/${sourceName}`)
    }
  }

  // Source list is not available.  Just return empty result
  const sources = props.source_sources
  if (sources === null || sources === undefined) {
    return <Empty />
  }

  const searchResults = props.search_searchResults
  const selectedSourceName = getSourceName(sources, idx)

  const results = findResult(selectedSourceName, searchResults)


  // Get current tab selection
  return (
    <div className="results-container">
      <div className="results-wrapper">
        <Tabs value={idx} onChange={handleChange}>
          {sources.map(source => (
            <Tab key={source.uuid} label={source.name === "enrichment" ? "Gene Enrichment" : 
                                          source.name === "interactome" ? "Gene Neighborhood" : source.name} />
          ))}
        </Tabs>
        <TabContent 
          results={results}
          history={props.history}
        />
      </div>
    </div>
  )
}

const getSourceName = (sources, idx) => {
  return sources[idx].name
}

const findResult = (sourceName, results) => {
  if (results === null || results === undefined) {
    return null
  }

  const resultArray = results.sources

  let idx = resultArray.length

  while (idx--) {
    const currentResult = resultArray[idx]
    if (currentResult.sourceName === sourceName) {
      return currentResult
    }
  }
  return null
}

const mapStateToProps = state => {
  return {
    search_results: state.search.results,
    search_searchResults: state.search.searchResults,
    source_sources: state.source.sources,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    networkActions_networkClear: (payload) => dispatch(networkClear(payload)),
    networkActions_changeListIndex: (payload) => dispatch(changeListIndex(payload)),
    uiStateActions_setSelectedSource: (payload) => dispatch(setSelectedSource(payload))
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
) (withStyles(styles)(Results))