import React, { useEffect } from 'react'
import './style.css'

import InputPanel from '../InputPanel'
import Results from '../Results'
import AppShell from '../AppShell'
import LoadingPanel from '../LoadingPanel'

const HomePanel = props => {
  const historyListener = (location, action) => {
    if (action === 'POP' && location.pathname !== '/') {
      console.log('Back button::', location, action)
      props.searchActions.clearAll()
      props.history.push('/')
    }
  }

  useEffect(() => {
    // Check pathname to see if we can access the existing job
    const { pathname } = props.location

    if (pathname !== '/') {
      const params = pathname.split('/')
      if (params.length > 2) {
        const jobId = params[1]
        props.history.listen(historyListener)
        props.history.push(pathname)
        props.searchActions.fetchResultStarted({ jobId })

        return
      }
    }

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

  const { search } = props

  // TODO: Display error message
  if (search === undefined || search === null) {
    return (
      <AppShell {...props}>
        <LoadingPanel title="No data" />
      </AppShell>
    )
  }
  
  const { isFetching, searchResults } = search

  // Still searching and no result is available
  if ((isFetching && searchResults === null) || isFetching) {
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
