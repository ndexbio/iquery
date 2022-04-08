import React from 'react'

import AppShell from '../AppShell'
import StartPanel from './StartPanel'

const TopPage = props => (
  <div style={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column'}}>
      <AppShell {...props} />
      <StartPanel {...props} />
  </div>
)

export default TopPage
