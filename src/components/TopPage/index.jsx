import React from 'react'

import AppShell from '../AppShell'
import StartPanel from './StartPanel'

const TopPage = props => (
  <AppShell 
    uiState_servicesListOpen={props.uiState_servicesListOpen}
    uiState_isSettingsOpen={props.uiState_isSettingsOpen}
    uiStateActions_setSettingsOpen={props.uiState_setSettingsOpen}
    uiStateActions_setServicesListOpen={props.uiStateActions_setServicesListOpen}

    source_sources={props.source_sources}

    search_queryGenes={props.search_queryGenes}
    search_results={props.search_results}
    searchActions_clearAll={props.searchActions_clearAll}
    searchActions_searchStarted={props.searchActions_searchStarted}

    networkActions_networkClear={props.networkActions_networkClear}

    cyrestActions_setPort={props.cyrestActions_setPort}

    history_location_search={props.history.location.search}
  >
    <StartPanel
      search={props.search}
      searchActions_setQuery={props.searchActions_setQuery}
      searchActions_searchStarted={props.searchActions_searchStarted}

      source_sources={props.source_sources}
      sourceActions_findSourceStarted={props.sourceActions_findSourceStarted}

      location_search={props.location_search}
      history={props.history}
    />
  </AppShell>
)

export default TopPage
