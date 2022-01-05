import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import HoverTab from './HoverTab'
import Empty from './Empty'
import TabContent from './TabContent'
import { PresetDataSources } from './PresetDataSources'

const styles = (theme) => ({
  tabs: {},
  grow: {
    flexGrow: 1,
  },
})

const SOURCE_IDS: string[] = Object.keys(PresetDataSources)

const Results = (props) => {
  const { classes, ...others } = props
  const { search, location, uiStateActions, uiState } = others
  const { selectedSource } = uiState

  const [jobId, setJobId] = useState<string>('')
  const [networkId, setNetworkId] = useState<string>('')
  const [sourceList, setSourceList] = useState<any[]>([])
  const [queryGenes, setQueryGenes] = useState<string[]>([])

  useEffect(() => {
    if (selectedSource === '') {
      const defaultSource: string = getSourceName(sourceList, 0)
      uiStateActions.setSelectedSource(defaultSource)
    }
  }, [selectedSource])

  useEffect(() => {
    const { searchResults } = search
    if (searchResults === null) {
      return
    }

    const originalSourceList = searchResults.sources
    const sorted = getSortedList(originalSourceList)
    setSourceList(sorted)
    setQueryGenes(searchResults.query)

    const selectedTabIndex = findIndex(uiState.selectedSource, sourceList)
    updateHistory(selectedTabIndex)
  }, [search])

  const findIndex = (sourceName: string, sourceList: any[]): number => {
    for (let i = 0; i < sourceList.length; i++) {
      if (sourceList[i].sourceName === sourceName) {
        return i
      }
    }
    return -1
  }

  useEffect(() => {
    const parts = location.pathname.split('/')

    // Extract Job ID
    if (parts.length > 1 && jobId !== parts[1]) {
      setJobId(parts[1])
    }

    // Extract tab index if available
    if (parts.length > 2 && uiState.selectedSource !== parts[2]) {
      const newSourceName = parts[2]
      uiStateActions.setSelectedSource(newSourceName)
    }

    if (parts.length > 3 && networkId !== parts[3]) {
      setNetworkId(parts[3])
    }
  }, [location])

  const handleChange = (event, idx) => {
    updateHistory(idx)
    props.networkActions.networkClear()
    props.networkActions.changeListIndex(0)
    if (idx === 3) {
      uiStateActions.setPathwayFigure(true)
    }
  }

  const updateHistory = (newSelectedIndex: number): void => {
    const index: number = findIndex(selectedSource, sourceList)
    if (index === newSelectedIndex) {
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
  let index: number = findIndex(selectedSource, sourceList)
  if (index === -1) {
    index = 0
  }

  const results = findResult(selectedSource, searchResults)
  const hideSearchBar = props.uiState.hideSearchBar

  // Get current tab selection
  return (
    <div className={hideSearchBar ? 'headerless-results-container' : 'results-container'}>
      <div className="results-wrapper">
        <Tabs value={index} onChange={handleChange} className={classes.tabs}>
          {sourceList.map((entry) => {
            return (
              <HoverTab
                key={entry.sourceName}
                label={PresetDataSources[entry.sourceName] ? PresetDataSources[entry.sourceName].label : null}
                tooltip={PresetDataSources[entry.sourceName] ? PresetDataSources[entry.sourceName].tooltip : null}
              />
            )
          })}
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

const getSortedList = (sourceList: any[]) => {
  const sourceMap = {}
  sourceList.forEach((entry) => {
    sourceMap[entry.sourceName] = entry
  })

  const orderedList: any[] = []

  // Re-order the list based on the preset source list (this fixes the order of the tabs)
  SOURCE_IDS.forEach((sourceId: string) => {
    const entry = sourceMap[sourceId]
    orderedList.push(entry)
  })

  return orderedList
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

  const resultArray = sources.filter((entry) => entry !== undefined)
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
