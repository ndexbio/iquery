import React, { useEffect, useState, useMemo } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'
import Cytoscape from 'cytoscape'
import CyCanvas from 'cytoscape-canvas'
import { CxToCyCanvas } from 'cyannotation-cx2js'
import Warning from './Warning'
import { CONCENTRIC_LAYOUT, COSE_LAYOUT, PRESET_LAYOUT } from './LayoutSettings'

import './style.css'

export const MAX_NETWORK_SIZE = 5000

Cytoscape.use(CyCanvas)
let cyInstance = null

// For annotation rendering
const annotationRenderer = new CxToCyCanvas(CxToJs)
const utils = new CyNetworkUtils()

// This is the network attributes storing graphical annotations.
const ANNOTATION_TAG = '__Annotations'

// Default network background color
const DEF_BG_COLOR = '#FFFFFF'

/**
 *
 * Simple wrapper for cytoscape.js react component
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const CytoscapeViewer = props => {
  const { highlights } = props.uiState
  const { fit, originalCX } = props.network

  // Use default color if this property is not available.
  let backgroundColor = props.network.backgroundColor
  if (backgroundColor === null || backgroundColor === undefined) {
    backgroundColor = DEF_BG_COLOR
  }

  let niceCX = useMemo(() => {
    const networkAttr = originalCX.filter(
      entry => entry.networkAttributes !== undefined
    )

    if (networkAttr !== undefined) {
      const firstEntry = networkAttr[0]
      if (
        firstEntry === undefined ||
        firstEntry.networkAttributes === undefined
      ) {
        return
      }

      const netAttrArray = firstEntry.networkAttributes
      const annotationEntry = netAttrArray.filter(
        attr => attr.n === ANNOTATION_TAG
      )
      if (annotationEntry.length !== 0) {
        const nice = utils.rawCXtoNiceCX(originalCX)
        console.log('* Registering annotation renderer for this niceCX:', annotationEntry)
        annotationRenderer.drawAnnotationsFromNiceCX(cyInstance, nice)
        return nice
      }
    }

    return null
  }, originalCX)

  /*
    Node/Edge Selections
   */
  useEffect(() => {
    // Event handler can be set only when Cytoscape.js instance is available.
    if (cyInstance === undefined || cyInstance === null) {
      return
    }

    // Background tapped: Remove selection
    // (This is the standard Cytosape UX)
    cyInstance.on('tap', function() {
      try {
        props.networkActions.unselectEdges()
        props.networkActions.unselectNodes()
      } catch (e) {
        console.warn(e)
      }
    })

    const selectEdge = () => {
      setTimeout(() => {
        const edges = []
        const selectedEdges = cyInstance.$('edge:selected')
        selectedEdges.forEach(element => {
          edges.push(element.data())
        })
        if (edges.length === 0) {
          props.networkActions.unselectEdges()
        } else {
          props.networkActions.selectEdges(edges)
        }
      }, 1)
    }

    const selectNode = () => {
      setTimeout(() => {
        const nodes = []
        const selectedNodes = cyInstance.$('node:selected')
        selectedNodes.forEach(element => {
          if (element.data().name !== '') {
            nodes.push(element.data())
          }
        })
        if (nodes.length === 0) {
          props.networkActions.unselectNodes()
        } else {
          props.networkActions.selectNodes(nodes)
        }
      }, 1)
    }

    cyInstance.on('tap', 'node', function() {
      try {
        cyInstance.nodes().removeClass('connected')
      } catch (e) {
        console.warn(e)
      }
      selectNode()
    })

    cyInstance.on('tap', 'edge', function() {
      try {
        cyInstance.nodes().removeClass('connected')
        const selected = this.data()
        const { source, target } = selected
        cyInstance.$('#' + source + ', #' + target).addClass('connected')
      } catch (e) {
        console.warn(e)
      }
      selectEdge()
    })

    cyInstance.on('boxend', function(event) {
      selectEdge()
      selectNode()
    })

    // Reset the UI state (highlight)
    if (highlights) {
      cyInstance.elements().addClass('faded')
      const query = cyInstance.filter('node[querynode = "true"]')
      query.addClass('highlight')
    } else {
      cyInstance
        .elements()
        .removeClass('faded')
        .removeClass('highlight')
    }

    return () => {
      console.log('Network viewer unmounted')
    }
  }, [])

  useEffect(() => {
    if (cyInstance === undefined || cyInstance === null) {
      return
    }

    const targets = props.search.selectedGenes
    if (targets === null || targets === undefined) {
      return
    }

    const selected = cyInstance.elements('node[name = "' + targets[0] + '"]')

    if (selected.length !== 0) {
      cyInstance.animate(
        {
          zoom: 2,
          center: {
            eles: selected[0]
          }
        },
        {
          duration: 500
        }
      )
    }

    if (targets.length === 0) {
      cyInstance.animate(
        {
          fit: {
            eles: cyInstance.elements(),
            padding: 6
          }
        },
        {
          duration: 500
        }
      )
    }
  }, [props.search.selectedGenes])

  useEffect(() => {
    if (cyInstance === undefined || cyInstance === null) {
      return
    }
    if (fit) {
      cyInstance.animate(
        {
          fit: {
            eles: cyInstance.elements(),
            padding: 6
          }
        },
        {
          duration: 500
        }
      )
      props.networkActions.fitNetworkView(false)
    }
  }, [fit])

  // Check network size and show warning if it's too big for this renderer
  const numObjects = props.network.nodeCount + props.network.edgeCount
  if (numObjects > MAX_NETWORK_SIZE) {
    return <Warning {...props} />
  }

  // Render actual network
  const cyjs = props.network.network
  if (cyjs === null || cyjs === undefined) {
    return null
  }

  // Network background should be set via CSS.
  const networkAreaStyle = {
    width: '100%',
    height: '100%',
    background: backgroundColor
  }

  const isLayoutAvailable = cyjs.isLayout

  let layout = PRESET_LAYOUT
  if (!isLayoutAvailable && cyjs.elements.length < 500) {
    layout = COSE_LAYOUT
  } else if (!isLayoutAvailable) {
    layout = CONCENTRIC_LAYOUT
  }

  if (cyInstance !== null) {
    cyInstance.resize()

    if (layout === COSE_LAYOUT) {
      layout.stop = () => {
        setTimeout(() => {
          cyInstance.fit()
        }, 200)
      }
    }

    if (highlights) {
      cyInstance.elements().addClass('faded')
      const query = cyInstance.filter('node[querynode = "true"]')
      query.addClass('highlight')
    } else {
      cyInstance
        .elements()
        .removeClass('faded')
        .removeClass('highlight')
    }
  }

  return (
    <CytoscapeComponent
      elements={cyjs.elements}
      layout={layout}
      style={networkAreaStyle}
      stylesheet={cyjs.style}
      cy={cy => {
        cyInstance = cy
      }}
    />
  )
}

export default CytoscapeViewer
