import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HomePanel from '../../components/HomePanel'

import * as searchActions from '../../actions/search'

const MainContainer = props => <HomePanel {...props} />

function mapStateToProps(state) {
  return {
    search: state.search
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // Main ontology tree
    searchActions: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)
