import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Empty from './Empty'
import Ndex from './Ndex'

const styles = theme => ({
  tabs: {
    width: '100%',
    backgroundColor: '#FFFFFF'
  }
})

const Results = props => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { classes, ...others } = props

  const searchResults = props.search.searchResults

  console.log('Current Result:', searchResults)

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

  console.log('TABBS = ', tabs)
  return tabs
}

const getTabContent = (index, sources, props) => {
  if (sources === null || sources === undefined) {
    return null
  }

  const source = sources[index]
  if(!source) {
    return null
  }

  const hits = source.results
  return <Ndex hits={hits} {...props} />
}

export default withStyles(styles)(Results)
