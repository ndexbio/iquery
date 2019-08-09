import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Empty from './Empty'
import TabContent from './TabContent'

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
    props.networkActions.networkClear()
  }

  const updateHistory = newValue => {
    // Update URL
    const results = props.search.results
    if (results === null || results === undefined) {
      return
    }

    const jobId = results.jobId
    const searchResults = props.search.searchResults
    if (searchResults !== undefined && searchResults !== null) {
      const sourceName = getSourceName(sources, idx)
      console.log('** Tab change:', jobId, sourceName)
      props.uiStateActions.setSelectedSource(sourceName)
      props.history.push(`/${jobId}/${sourceName}`)
    }
  }

  const { classes, ...others } = props

  // Source list is not available.  Just return empty result
  const sources = props.source.sources
  if (sources === null || sources === undefined) {
    return <Empty />
  }

  const { searchResults } = props.search
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
        <TabContent results={results} {...others} />
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

export default withStyles(styles)(Results)
