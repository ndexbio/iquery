import React from 'react'
import SearchPanel from '../SearchPanel'
import InputList from '../InputList'
import LoadingPanel from '../LoadingPanel'
import './style.css'

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const InputPanel = props => (
  <div className="input-container">
    <div className="input-wrapper">
      <SearchPanel {...props} />
      {props.search.isSearching ? <LoadingPanel /> : <InputList {...props} />}
    </div>
  </div>
)

export default InputPanel
