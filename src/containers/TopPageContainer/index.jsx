import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import * as searchActions from '../../actions/search'
import * as uiStateActions from '../../actions/uiState'
import * as networkActions from '../../actions/network'
import * as sourceActions from '../../actions/source'
import * as cyrestActions from '../../actions/cyrest'
import * as ndexSaveActions from '../../actions/ndexSave'
import ReactGA from 'react-ga'

import TopPage from '../../components/TopPage'

const TopPageContainer = props => {
  useEffect(() => {
    const { pathname } = props.location
    ReactGA.set({ page: pathname })
    ReactGA.pageview(pathname)

    const { history } = props
    history.listen(({ pathname }) => {
      ReactGA.set({ page: pathname })
      ReactGA.pageview(pathname)
    })
  }, [])
  return (
    <TopPage
      uiState_servicesListOpen={props.uiState.servicesListOpen}
      uiState_isSettingsOpen={props.uiState.isSettingsOpen}
      uiStateActions_setServicesListOpen={props.uiStateActions.setServicesListOpen}
      uiStateActions_setSettingsOpen={props.uiStateActions.setSettingsOpen} 

      source_sources={props.source.sources}
      sourceActions_findSourceStarted={props.sourceActions.findSourceStarted}

      search={props.search}
      searchActions_clearAll={props.searchActions.clearAll}
      searchActions_setQuery={props.searchActions.setQuery}
      searchActions_searchStarted={props.searchActions.searchStarted}

      networkActions_networkClear={props.networkActions.networkClear}

      cyrestActions_setPort={props.cyrestActions.setPort}

      location_search={props.location.search}
      history={props.history}
    />
  )
}

function mapStateToProps(state) {
  return {
    search: state.search,
    uiState: state.uiState,
    network: state.network,
    source: state.source,
    cyrest: state.cyrest,
    ndexSave: state.ndexSave
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    uiStateActions: bindActionCreators(uiStateActions, dispatch),
    networkActions: bindActionCreators(networkActions, dispatch),
    sourceActions: bindActionCreators(sourceActions, dispatch),
    cyrestActions: bindActionCreators(cyrestActions, dispatch),
    ndexSaveActions: bindActionCreators(ndexSaveActions, dispatch)
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopPageContainer)
)
