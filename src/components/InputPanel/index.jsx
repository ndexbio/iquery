import React from 'react'
import SearchPanel from '../CommandPanel'
import './style.css'
import GeneList from '../GeneList'

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
      <GeneList {...props} />
    </div>
  </div>
)

export default InputPanel
