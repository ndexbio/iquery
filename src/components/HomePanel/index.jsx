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
      props.searchActions.fetchResultStarted({ jobId })
    }

    window.onpopstate = onBackButtonEvent
    return () => {}
  }, [])

  const onBackButtonEvent = e => {
    e.preventDefault()
    props.searchActions.clearAll()
    props.history.push('/')
  }

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
