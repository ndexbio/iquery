import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

import CytoscapeComponent from 'react-cytoscapejs'

import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'

import './style.css'

let cy = null

const utils = new CyNetworkUtils()
const cx2js = new CxToJs(utils)

/**
 *
 * Simple wrapper for cytoscape.js react component
 *
 * @param props
 * @returns {*}
 * @constructor
 */
class CytoscapeViewer extends Component {
  componentDidMount() {

    if (this.cy !== undefined && this.cy !== null) {
      const props = this.props
      this.cy.on('tap', 'node', function() {
        try {
          // your browser may block popups
          const selected = this.data()
          console.log('TAP---------->', selected, props)
          props.networkActions.selectNode(selected)

        } catch (e) {
          // fall back on url change
        }
      })
    }
  }

  render() {
    // Convert th
    const rawCX = this.props.network.network
    if (rawCX === null || rawCX === undefined) {
      return null
    }

    const niceCX = utils.rawCXtoNiceCX(rawCX)
    console.log('NICE ===', niceCX)

    const attributeNameMap = {}
    const elements = cx2js.cyElementsFromNiceCX(niceCX, attributeNameMap)
    const style = cx2js.cyStyleFromNiceCX(niceCX, attributeNameMap)

    const elementsArray = [...elements.nodes, ...elements.edges]
    return (
      <CytoscapeComponent
        elements={elementsArray}
        layout={{ name: 'cose' }}
        style={{ width: '100%', height: '100%' }}
        stylesheet={style}
        cy={cy => (this.cy = cy)}
      />
    )
  }
}

export default CytoscapeViewer
