import React from 'react'
import './style.css'
import SearchPanel from '../SearchPanel'

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const InputPanel = props => (
  <div className="base">
    <SearchPanel {...props} />
  </div>
)

export default InputPanel
