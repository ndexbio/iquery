import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import './style.css'

import InputPanel from '../InputPanel'
import Results from '../Results'
import AppShell from '../AppShell'
import LoadingPanel from '../LoadingPanel'

import {fetchResultStarted} from '../../actions/search'

const HomePanel = props => {
  useEffect(() => {
    if (props.search_results !== null) {
      const jobId = props.search_results.jobId
      props.searchActions_fetchResultStarted({ jobId })
    }

    window.onpopstate = onBackButtonEvent
    return () => {}
  }, [])

  const onBackButtonEvent = e => {
    e.preventDefault()
    props.searchActions_clearAll()
    props.history.push('/')
  }

  const isFetching = props.search_isFetching
  const searchResult = props.search_searchResult

  // Still searching and no result is available
  if (isFetching && searchResult === null) {
    return (
      <AppShell
        history_location_search={props.history.location.search}
      >
        <LoadingPanel title="Loading Results..." />
      </AppShell>
    )
  }

  return (
    <AppShell 
      history_location_search={props.history.location.search}
    >
      <div className="container">
        <Results
          history={props.history}
        />
        <InputPanel />
      </div>
    </AppShell>
  )
}

const mapStateToProps = state => {
  return {
    search_isFetching: state.search.isFetching,
    search_searchResult: state.search.searchResult,
    search_results: state.search.results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchActions_fetchResultStarted: (payload) => dispatch(fetchResultStarted(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(HomePanel)
