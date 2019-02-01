import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HomePanel from '../../components/HomePanel'

import * as searchActions from '../../actions/search'
import * as uiStateActions from '../../actions/uiState'

const MainContainer = props => <HomePanel {...props} />

function mapStateToProps(state) {
  return {
    search: state.search,
    uiState: state.uiState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    uiStateActions: bindActionCreators(uiStateActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)
