import React from "react"

import AppShell from "../AppShell"
import StartPanel from "./StartPanel"

const TopPage = props => (
  <AppShell 
    {...props}
  >
    <StartPanel
      {...props}
    />
  </AppShell>
)

export default TopPage
