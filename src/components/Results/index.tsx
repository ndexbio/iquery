import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import HoverTab from './HoverTab'
import Empty from './Empty'
import TabContent from './TabContent'
import { PresetDataSources } from './PresetDataSources'


const styles = theme => ({
  tabs: {},
  grow: {
    flexGrow: 1,
  },
})

const Results = props => {
  const { classes, ...others } = props
  const { search, location } = others

  // Data source tab selection
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)

  // Current Job ID.  Always taken from path name
  const [jobId, setJobId] = useState<string>('')
  const [sourceList, setSourceList] = useState<any[]>([])
  const [queryGenes, setQueryGenes] = useState<string[]>([])

  useEffect(() => {
    const { searchResults } = search
    if (searchResults === null) {
      return
    }

    setSourceList(searchResults.sources)
    setQueryGenes(searchResults.query)
    updateHistory(selectedTabIndex)
  }, [search])

  useEffect(() => {
    const parts = location.pathname.split('/')
    if (parts.length > 1 && jobId !== parts[1]) {
      setJobId(parts[1])
    }
  }, [location])

  const handleChange = (event, idx) => {
    setSelectedTabIndex(idx)
    updateHistory(idx)
    props.networkActions.networkClear()
    props.networkActions.changeListIndex(0)
    if (idx === 3) {
      props.uiStateActions.setPathwayFigure(true)
    }
  }

  const updateHistory = (newSelectedIndex: number): void => {
    if (selectedTabIndex === newSelectedIndex) {
      return
    }

    const searchResults = search.searchResults
    if (searchResults !== undefined && searchResults !== null) {
      const selectedSourceName = getSourceName(sourceList, newSelectedIndex)
      props.uiStateActions.setSelectedSource(selectedSourceName)
      props.history.push(`/${jobId}/${selectedSourceName}`)
    }
  }

  if (jobId === '' || sourceList.length === 0) {
    return <Empty />
  }

  // Get current tab selection
  const { searchResults } = search
  const selectedSourceName = getSourceName(sourceList, selectedTabIndex)
  const results = findResult(selectedSourceName, searchResults)
  const hideSearchBar = props.uiState.hideSearchBar

  // Get current tab selection
  return (
    <div className={hideSearchBar ? 'headerless-results-container' : 'results-container'}>
      <div className="results-wrapper">
        <Tabs value={selectedTabIndex} onChange={handleChange} className={classes.tabs}>
          {sourceList.map(entry => (
            <HoverTab
              key={entry.uuid}
              label={PresetDataSources[entry.sourceName] ? PresetDataSources[entry.sourceName].label : null}
              tooltip={PresetDataSources[entry.sourceName] ? PresetDataSources[entry.sourceName].tooltip : null}
            />
          ))}
        </Tabs>

        {queryGenes.length !== 0 ? (
          <TabContent jobId={jobId} results={results} {...others} />
        ) : (
          <Empty message="No valid query genes." details="Your query did not contain any valid gene names." />
        )}
      </div>
    </div>
  )
}

const getSourceName = (sources: any[], idx: number) => {
  if (sources.length === 0 || sources[idx] === null) {
    return 'enrichment'
  }
  return sources[idx].sourceName
}

const findResult = (sourceName: string, searchResults) => {
  if (searchResults === undefined) {
    return null
  }

  const { sources } = searchResults

  if (!sources) {
    return null
  }

  const resultArray = sources.filter(entry => entry !== undefined)
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
