import React, { useEffect } from 'react'

import AppShell from '../AppShell'
import StartPanel from './StartPanel'

const TopPage = props => {
  useEffect(() => {
    window.onpopstate = onBackButtonEvent

    return () => {
      console.log('Page unmounted')
    }
  }, [])

  const onBackButtonEvent = e => {
    console.log('handling back button press')
    e.preventDefault()
    // props.history.push('/')
  }

  return (
    <AppShell {...props}>
      <StartPanel {...props} />
    </AppShell>
  )
}

export default TopPage
