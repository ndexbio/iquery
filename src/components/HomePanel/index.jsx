import React, { useEffect } from 'react'
import './style.css'

import QueryGeneList from '../QueryGeneList'
import Results from '../Results'
import AppShell from '../AppShell'
import LoadingPanel from '../LoadingPanel'

const UUID_VALIDATION = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const HomePanel = (props) => {
  const { search, location } = props

  const historyListener = (location, action) => {
    if (action === 'POP' && location.pathname !== '/') {
      console.log('Back button::', location, action)
      props.searchActions.clearAll()
      props.history.push('/')
    }
  }

  useEffect(() => {
    // Check pathname to see if we can access the existing job
    const { pathname } = location

    if (pathname !== '/') {
      const params = pathname.split('/')

      // Check the path has valid UUID
      let hasUUID = false
      for (let i = 0; i < params.length; i++) {
        const p = params[i]
        hasUUID = UUID_VALIDATION.test(p)
        if (hasUUID) {
          break
        }
      }

      if (!hasUUID) {
        // No need to fetch existing result
        return
      }

      let jobIdIndex = 0

      if (params.length > 2) {
        for (let i = 1; i < params.length; i++) {
          if (UUID_VALIDATION.test(params[i])) {
            jobIdIndex = i
            break
          }
        }
        const jobId = params[jobIdIndex]
        const path = params.slice(jobIdIndex, params.length).join('/')
        props.history.listen(historyListener)
        props.history.push(`/${path}`)
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
  if (searchResults === null || isFetching) {
    return (
      <AppShell {...props}>
        <LoadingPanel title="Loading Results..." />
      </AppShell>
    )
  }

  // Display the search results
  // TODO: define types for props
  return (
    <AppShell {...props}>
      <div className="container">
        <Results {...props} />
      </div>
    </AppShell>
  )
}

export default HomePanel
