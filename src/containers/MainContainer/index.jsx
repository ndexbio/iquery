import React from 'react'
import { connect } from 'react-redux'
import HomePanel from '../../components/HomePanel'

const MainContainer = () => <HomePanel />

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(MainContainer)
