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
const InputPanel = props => {
  if (props.search.results) {
    console.log(props.search.results.genes)
  }
  const stripGene = geneName => {
    if (geneName == null) {
      return null
    }
    if (geneName.startsWith('hgnc.symbol:') && geneName.length > 12) {
      return geneName.substring(12)
    }
    return geneName
  }

  const geneToNodeMap = {}
  let nodeList
  let nodeAttributes
  if (props.network.originalCX != null) {
    for (let i = 0; i < props.network.originalCX.length; i++) {
      if (props.network.originalCX[i].nodes != null) {
        nodeList = props.network.originalCX[i].nodes
        if (nodeAttributes != undefined) {
          break
        }
      }
      if (props.network.originalCX[i].nodeAttributes != null) {
        nodeAttributes = props.network.originalCX[i].nodeAttributes
        if (nodeList != undefined) {
          break
        }
      }
    }

    for (let i = 0; i < nodeAttributes.length; i++) {
      const currentAttribute = nodeAttributes[i]
      if (currentAttribute.n === 'member') {
        const nodeName = nodeList.filter(
          node => node['@id'] === currentAttribute.po
        )[0].n
        const geneNames = currentAttribute.v
        for (let j = 0; j < geneNames.length; j++) {
          geneToNodeMap[stripGene(currentAttribute.v[j])] = nodeName
        }
      }
    }
  }
  return (
    <div className="input-container">
      <div className="input-wrapper">
        <div className={'gene-list-title'}>
          Query Genes{' '}
          {props.search.results
            ? '(' + props.search.results.genes.size + ')'
            : null}
        </div>
        <GeneList geneToNodeMap={geneToNodeMap} {...props} />
      </div>
    </div>
  )
}

export default InputPanel
