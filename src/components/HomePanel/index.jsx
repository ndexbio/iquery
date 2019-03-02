import React, { useEffect } from 'react'
import './style.css'
import InputPanel from '../InputPanel'
import Results from '../Results'

import AppShell from '../AppShell'

const HomePanel = props => {
  useEffect(() => {
    window.onpopstate = onBackButtonEvent
    return () => {
      console.log('Page unmounted')
    }
  }, [])

  const onBackButtonEvent = e => {
    e.preventDefault()
    console.log('* Handling back button press')
    // props.history.push('/')
  }

  console.log('----------------------- New Home Panel ------------------')
  return (
    <AppShell {...props}>
      <div className="container">
        <InputPanel className="input" {...props} />
        <Results className="results" {...props} />
      </div>
    </AppShell>
  )
}

export default HomePanel
