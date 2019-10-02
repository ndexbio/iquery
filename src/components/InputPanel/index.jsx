import React from 'react'
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
      <div className={'gene-list-title'}>
        Query Genes ({props.search.queryList.length})
      </div>
      <GeneList {...props} />
    </div>
  </div>
)

export default InputPanel
