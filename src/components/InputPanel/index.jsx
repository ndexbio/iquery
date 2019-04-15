import React from 'react'
import SearchPanel from '../CommandPanel'
import InputList from '../InputList'
import LoadingPanel from '../LoadingPanel'
import './style.css'
import Typography from '@material-ui/core/Typography'
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
