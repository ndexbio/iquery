import React, { useEffect, useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import './style.css'
import Warning from './Warning'

let cyInstance = null

const PRESET_LAYOUT = {
  name: 'preset',
  padding: 6
}

const CONCENTRIC_LAYOUT = {
  name: 'concentric',
  padding: 6,
  minNodeSpacing: 100
}

const COSE_SETTING = {
  name: 'cose',
  padding: 6,
  nodeRepulsion: function(node) {
    return 10080000
  },
  nodeOverlap: 400000,
  idealEdgeLength: function(edge) {
    return 10
  }
}

export const MAX_NETWORK_SIZE = 5000

/**
 *
 * Simple wrapper for cytoscape.js react component
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const CytoscapeViewer = props => {
  const highlights = props.uiState.highlights

  useEffect(() => {
    if (cyInstance === undefined || cyInstance === null) {
      return
    }

    cyInstance.on('tap', function(event) {
      try {
        cyInstance.nodes().removeClass('connected')
        const target = event.target
        if (target === cyInstance) {
          props.networkActions.changeTab(0)
          console.log('UNSELECT')
        }
      } catch (e) {
        console.warn(e)
      }
    })

    cyInstance.on('tap', 'node', function() {
      const nodes = []
      const selectedNodes = cyInstance.$('node:selected')
      selectedNodes.forEach(element => {
        if (element.data().name != '') {
          nodes.push(element.data())
        }
      })
      console.log('nodes: ' + nodes)
      props.networkActions.selectNodes(nodes)

      try {
        cyInstance.nodes().removeClass('connected')
      } catch (e) {
        console.warn(e)
      }
    })

    cyInstance.on('tap', 'edge', function() {
      const edges = []
      const selectedEdges = cyInstance.$('edge:selected')
      selectedEdges.forEach(element => {
        edges.push(element.data())
      })
      console.log('edges: ' + edges)
      props.networkActions.selectEdges(edges)

      try {
        cyInstance.nodes().removeClass('connected')
        const selected = this.data()
        const { source, target } = selected
        cyInstance.$('#' + source + ', #' + target).addClass('connected')
      } catch (e) {
        console.warn(e)
      }
    })

    const selection = () => {
      const edges = []
      const selectedEdges = cyInstance.$('edge:selected')
      selectedEdges.forEach(element => {
        edges.push(element.data())
      })
      console.log('edges: ', edges)
      props.networkActions.selectEdges(edges)

      const nodes = []
      const selectedNodes = cyInstance.$('node:selected')
      selectedNodes.forEach(element => {
        if (element.data().name != '') {
          nodes.push(element.data())
        }
      })
      console.log('nodes: ', nodes, selectedNodes)
      props.networkActions.selectNodes(nodes)
    }

    cyInstance.on('boxend', function(event) {
      setTimeout(() => {
        selection()
      }, 100)
    })

    // Reset the UI state (hilight)
    props.uiStateActions.setHighlights(true)

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

    const zoom = props.uiState.zoomed
    if (zoom === null || zoom === undefined) {
      return
    }

    if (zoom) {
      props.searchActions.clearSelectedGenes()
      props.uiStateActions.setZoomed(false)
    }
  }, [props.uiState.zoomed])

  const numObjects = props.network.nodeCount + props.network.edgeCount
  if (numObjects > MAX_NETWORK_SIZE) {
    return <Warning {...props} />
  }

  const cyjs = props.network.network
  if (cyjs === null || cyjs === undefined) {
    return null
  }

  const networkAreaStyle = {
    width: '100%',
    height: '100%',
    background: props.network.backgroundColor
  }

  const isLayoutAvailable = cyjs.isLayout

  let layout = PRESET_LAYOUT
  if (!isLayoutAvailable && cyjs.elements.length < 500) {
    layout = COSE_SETTING
    console.log('cose')
  } else if (!isLayoutAvailable) {
    layout = CONCENTRIC_LAYOUT
    console.log('concentric')
  }

  if (cyInstance !== null) {
    cyInstance.resize()

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
      cy={cy => (cyInstance = cy)}
    />
  )
}

export default (CytoscapeViewer)
