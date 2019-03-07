import React, { useEffect } from 'react'
import './style.css'
import InputPanel from '../InputPanel'
import Results from '../Results'

import AppShell from '../AppShell'
import LoadingPanel from '../LoadingPanel'

const HomePanel = props => {
  useEffect(() => {
    // Call search

    if (props.search.results !== null) {
      const jobId = props.search.results.jobId
      console.log('Fetching res')
      props.searchActions.fetchResultStarted({ jobId })
    }

    window.onpopstate = onBackButtonEvent
    return () => {
      console.log('Page unmounted')
    }
  }, [])

  const onBackButtonEvent = e => {
    e.preventDefault()
    console.log('* Handling back button press')
    props.searchActions.clearAll()
    props.history.push('/')
  }

  console.log('----------------------- New Home Panel ------------------')

  if (props.search.isFetching) {
    return <LoadingPanel title="Loading Search Results" />
  }

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
