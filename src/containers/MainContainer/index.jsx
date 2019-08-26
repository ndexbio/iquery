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

import HomePanel from '../../components/HomePanel'

const MainContainer = props => {
  useEffect(() => {
    const { history } = props

    history.listen(({ pathname }) => {
      ReactGA.set({ page: pathname })
      ReactGA.pageview(pathname)
    })
  }, [])
  return (
    <HomePanel
      ndexSave_ndexModal={props.ndexSave.ndexModal}
      ndexSave_profile={props.ndexSave.profile}
      ndexSave_errorMessage={props.ndexSave.errorMessage}
      ndexSave_networkUrl={props.ndexSave.networkUrl}
      ndexSaveActions_saveToNDEx={props.ndexSaveActions_saveToNDEx}
      ndexSaveActions_setProfile={props.ndexSaveActions.setProfile}
      ndexSaveActions_setNDExModalOpen={props.ndexSaveActions.setNDExModalOpen}
      ndexSaveActions_credentialsSignOn={props.ndexSaveActions.credentialsSignOn}
      ndexSaveActions_googleSignOn={props.ndexSaveActions.googleSignOn}
      ndexSaveActions_setErrorMessage={props.ndexSaveActions.setErrorMessage}

      cyrest_available={props.cyrest.available}
      cyrest_isLoadingNetwork={props.cyrest.isLoadingNetwork}
      cyrest_lastResponse={props.cyrest.lastResponse}
      cyrestActions_startCyrestPolling={props.cyrestActions.startCyRestPolling}
      cyrestActions_stopCyrestPolling={props.cyrestActions.stopCyRestPolling}
      cyrestActions_importNetworkStarted={props.cyrest.importNetworkStarted}

      uiState_zoomed={props.uiState.zoomed}
      uiState_highlights={props.uiState.highlights}
      uiState_selectedSource={props.uiState.selectedSource}
      uiState_sort={props.uiState.sort}
      uiState_sortOrder={props.uiState.sortOrder}
      uiState_sortOverlapOn={props.uiState.sortOverlapOn}
      uiState_isSettingsOpen={props.uiState.isSettingsOpen}
      uiState_servicesListOpen={props.uiState.servicesListOpen}
      uiStateActions_setServicesListOpen={props.uiStateActions.setServicesListOpen}
      uiStateActions_setZoomed={props.uiStateActions.setZoomed}
      uiStateActions_setHighlights={props.uiStateActions.setHighlights}
      uiStateActions_clearSelectedGenes={props.uiStateActions.clearSelectedGenes}
      uiStateActions_setSelectedSource={props.uiStateActions.setSelectedSource}
      uiStateActions_setSettingsOpen={props.uiStateActions.setSettingsOpen}
      uiStateActions_setSortOrder={props.uiStateActions.setSortOrder}

      network={props.network}
      networkActions_changeTab={props.networkActions.changeTab}
      networkActions_selectNodes={props.networkActions.selectNodes}
      networkActions_unselectNodes={props.networkActions.unselectNodes}
      networkActions_selectEdges={props.networkActions.selectEdges}
      networkActions_unselectEdges={props.networkActions.unselectEdges}
      networkActions_changeListIndex={props.networkActions.changeListIndex}
      networkActions_networkFetchStarted={props.networkActions.networkFetchStarted}
      networkActions_networkClear={props.networkActions.networkClear}

      search={props.search}
      searchActions_clearSelectedGenes={props.searchActions.clearSelectedGenes}
      searchActions_setSelectedGenes={props.searchActions.setSelectedGenes}
      searchActions_clearAll={props.searchActions.clearAll}
      searchActions_setActualResults={props.searchActions.setActualResults}
      searchActions_setQuery={props.searchActions.setQuery}
      searchActions_searchStarted={props.searchActions.searchStarted}
      searchActions_fetchResultStarted={props.searchActions.fetchResultStarted}

      source_sources={props.source.sources}

      cyrestActions_importNetworkStarted={props.cyrestActions_importNetworkStarted}
      cyrestActions_setPort={cyrestActions.setPort}

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
  )(MainContainer)
)
