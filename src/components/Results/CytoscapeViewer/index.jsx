import React from 'react'
import { Typography } from '@material-ui/core'

import CytoscapeComponent from 'react-cytoscapejs'

import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'

import './style.css'

let cy = null


const utils = new CyNetworkUtils()
const cx2js = new CxToJs(utils)

/**
 * Simple wrapper for the Cytoscape viewer
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const CytoscapeViewer = props => {

  const rawCX = props.network.network
  if(rawCX === null || rawCX === undefined) {
    return null
  }

  const niceCX = utils.rawCXtoNiceCX(rawCX)
  console.log('NICE ===', niceCX)

  const attributeNameMap = {}
  const elements = cx2js.cyElementsFromNiceCX(niceCX, attributeNameMap)
  const style = cx2js.cyStyleFromNiceCX(niceCX, attributeNameMap)

  console.log('CYJS ===', elements, style)

  const elementsArray = [...elements.nodes, ...elements.edges]
  // const elements = [
  //   { data: { id: 'one', label: 'Node 1' } },
  //   { data: { id: 'two', label: 'Node 2' } },
  //   {
  //     data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' }
  //   }
  // ]
  console.log('Cy CAll----')
  return (
    <CytoscapeComponent
      elements={elementsArray}
      layout={{ name: 'cose' }}
      style={{ width: '100%', height: '100%' }}
      stylesheet={style}
      cy={cy => (cy = cy)}
    />
  )
}

export default CytoscapeViewer
