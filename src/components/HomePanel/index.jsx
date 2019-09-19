import React, { useEffect } from 'react'
import './style.css'

import InputPanel from '../InputPanel'
import Results from '../Results'
import AppShell from '../AppShell'
import LoadingPanel from '../LoadingPanel'

const HomePanel = props => {
  useEffect(() => {
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

  const isFetching = props.search.isFetching
  const searchResults = props.search.searchResults

  // Still searching and no result is available
  if (isFetching && searchResults === null) {
    return (
      <AppShell {...props}>
        <LoadingPanel title="Loading Results..." />
      </AppShell>
    )
  }

  return (
    <AppShell {...props}>
      <div className="container">
        <Results {...props} />
        <InputPanel {...props} />
      </div>
    </AppShell>
  )
}

export default HomePanel
