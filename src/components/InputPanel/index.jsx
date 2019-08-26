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
      <div className={"gene-list-title"}>Query Genes</div>
      <GeneList
        search_results={props.search_results}
        search_selectedGenes={props.search_selectedGenes}
        searchActions_clearSelectedGenes={props.searchActions_clearSelectedGenes}
        searchActions_setSelectedGenes={props.searchActions_setSelectedGenes}

        network_hitGenes={props.network_hitGenes}
      />
    </div>
  </div>
)

export default InputPanel
