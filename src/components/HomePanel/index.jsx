import React, { useEffect, useState } from 'react'
import './style.css'

import InputPanel from '../InputPanel'
import Results from '../Results'
import AppShell from '../AppShell'
import LoadingPanel from '../LoadingPanel'

const HomePanel = props => {
  const [baseUrl, setBaseUrl] = useState(window.location.origin)

  const historyListener = (location, action) => {
    if (action === 'POP' && location.pathname !== '/') {
      console.log('Back button::', location, action)
      props.searchActions.clearAll()
      props.history.push('/')
    }
  }

  useEffect(() => {
    if (props.search.results !== null) {
      const jobId = props.search.results.jobId
      props.searchActions.fetchResultStarted({ jobId })
    }

    const { queryList } = props.search

    if (queryList.length === 0) {
      console.log('* No query genes. Reload called:', props, queryList)
      props.searchActions.clearAll()
      props.history.push('/')
      return
    }

    props.history.listen(historyListener)

    return () => {}
  }, [])

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
