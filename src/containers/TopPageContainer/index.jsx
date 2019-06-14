import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TopPage from '../../components/TopPage'
import { withRouter } from 'react-router-dom'

import * as searchActions from '../../actions/search'
import * as uiStateActions from '../../actions/uiState'
import * as networkActions from '../../actions/network'
import * as sourceActions from '../../actions/source'
import * as cyrestActions from '../../actions/cyrest'
import ReactGA from 'react-ga'

// For Google Analygtics
const GA_DEV_ID = 'UA-62588031-6' // Dev server

ReactGA.initialize(GA_DEV_ID)

const TopPageContainer = props => {
  useEffect(() => {
    const { pathname } = props.location
    ReactGA.set({ page: pathname })
    ReactGA.pageview(pathname)
    console.log('Root component mounted', pathname)
  }, [])
  return <TopPage {...props} />
}

function mapStateToProps(state) {
  return {
    search: state.search,
    uiState: state.uiState,
    network: state.network,
    source: state.source,
    cyrest: state.cyrest
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    uiStateActions: bindActionCreators(uiStateActions, dispatch),
    networkActions: bindActionCreators(networkActions, dispatch),
    sourceActions: bindActionCreators(sourceActions, dispatch),
    cyrestActions: bindActionCreators(cyrestActions, dispatch)
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopPageContainer)
)
