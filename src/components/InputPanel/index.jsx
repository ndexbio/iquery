import React from 'react'
import InputList from '../InputList'
import LoadingPanel from '../LoadingPanel'
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
      <GeneList {...props} />
    </div>
  </div>
)

export default InputPanel
