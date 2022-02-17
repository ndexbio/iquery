import React, { useEffect, useState } from 'react'
import './style.css'

import GeneList from '../GeneList'

/**
 * List of query genes displayed on the right side of the window
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const QueryGeneList = props => {
  const { network, uiState, search } = props
  const { hideSearchBar } = uiState

  const stripGene = (geneName: string | null): string => {
    if (geneName === null) {
      return ''
    }

    // TODO: ???
    if (geneName.startsWith('hgnc.symbol:') && geneName.length > 12) {
      return geneName.substring(12)
    }
    return geneName
  }

  const [geneToNodeMap, setGeneToNodeMap] = useState<object>({})
  const { results, validateGenesWithMyGene, searchResults } = search

  useEffect(() => {
    if (network === null || network === undefined || network.originalCX === null) {
      return
    }

    const geneMap = {}

    let nodeList = []
    let nodeAttributes = []

    const { originalCX } = network

    for (let i = 0; i < originalCX.length; i++) {
      if (originalCX[i].nodes !== null && originalCX[i].nodes !== undefined) {
        nodeList = originalCX[i].nodes
        if (nodeAttributes.length !== 0) {
          break
        }
      }
      if (originalCX[i].nodeAttributes !== null && originalCX[i].nodeAttributes !== undefined) {
        nodeAttributes = originalCX[i].nodeAttributes
        if (nodeList.length !== 0) {
          break
        }
      }
    }

    for (let i = 0; i < nodeAttributes.length; i++) {
      const currentAttribute = nodeAttributes[i]
      if (currentAttribute['n'] === 'member') {
        const nodeName = nodeList.filter(node => node['@id'] === currentAttribute['po'])[0]['n']
        const geneNames: any[] = currentAttribute['v']
        for (let j = 0; j < geneNames.length; j++) {
          const gene = stripGene(currentAttribute['v'][j])
          geneMap[gene] = nodeName
        }
      }
    }

    setGeneToNodeMap(geneMap)
  }, [network])



  return (
    <div className={'query-gene-list-container'}>
      <div className={'query-gene-list-wrapper'}>
        <div className={'query-gene-list-title'}>
          Query Genes{' '}
          {
            validateGenesWithMyGene && results && results.genes.size ? `(${network.hitGenes.length} / ${results.genes.size})` : `(${network.hitGenes.length} / ${searchResults.query.length})`
          }
        </div>
        <GeneList geneToNodeMap={geneToNodeMap} {...props} />
      </div>
    </div>
  )
}

export default QueryGeneList
