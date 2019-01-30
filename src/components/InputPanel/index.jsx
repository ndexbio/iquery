import React from 'react'
import './style.css'
import SearchPanel from '../SearchPanel'
import InputList from '../InputList'

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
    <InputList {...props} />
  </div>
)

export default InputPanel
