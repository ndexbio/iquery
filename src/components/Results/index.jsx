import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Empty from './Empty'
import Ndex from './Ndex'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  tabs: {
    width: '100%',
    backgroundColor: '#FFFFFF'
  }
})

const Results = props => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    updateHistory(0)
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    updateHistory(newValue)
    props.networkActions.networkClear()
  }

  const updateHistory = (newValue) => {
    // Update URL
    const jobId = props.search.results.jobId
    const searchResults = props.search.searchResults
    if(searchResults !== undefined && searchResults !== null) {
      const source = searchResults.sources[newValue]
      console.log('** Tab change:', jobId, source)
      props.uiStateActions.setSelectedSource(source.sourceName)
      props.history.push(`/${jobId}/${source.sourceName}`)
    }
  }

  const { classes, ...others } = props

  const searchResults = props.search.searchResults


  // Display message panel if no result is available
  if (searchResults === null) {
    return <Empty />
  }


  return (
    <div className="results-container">
      <div className="results-wrapper">
        <Tabs value={value} onChange={handleChange}>
          {getTabs(searchResults.sources)}
        </Tabs>
        {getTabContent(value, searchResults.sources, others)}
      </div>
    </div>
  )
}

const getTabs = sources => {
  if (sources === null || sources === undefined) {
    return null
  }

  const tabs = sources.map(source => (
    <Tab key={source.sourceUUID} label={source.sourceName} />
  ))

  return tabs
}

const getTabContent = (index, sources, props) => {
  if (sources === null || sources === undefined) {
    return null
  }

  const source = sources[index]
  if (!source) {
    return null
  }

  const { results, sourceUUID } = source
  return <Ndex hits={results} sourceUUID={sourceUUID} {...props} />
}

export default withStyles(styles)(Results)
