import React from 'react'

import AppShell from '../AppShell'
import StartPanel from './StartPanel'

const TopPage = props => (
  <AppShell 
    history_location_search={props.history.location.search}
  >
    <StartPanel
      location_search={props.location_search}
      history={props.history}
    />
  </AppShell>
)

export default TopPage
