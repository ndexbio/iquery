import React from 'react'
import './style.css'
import SearchTextBox from './SearchTextBox'

import logo from '../../assets/images/cytoscape-logo.svg'
import LoadingPanel from '../LoadingPanel'

const StartPanel = props => {
  if (props.search.isSearching) {
    return <LoadingPanel />
  }

  return (
    <div className="start-container">
      <div className="start-title">
        <img className="start-logo" src={logo} alt="Cytoscape logo" />
      </div>
      <SearchTextBox {...props} />
    </div>
  )
}

export default StartPanel
