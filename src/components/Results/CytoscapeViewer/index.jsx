import React, { useEffect, useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import './style.css'
import Warning from './Warning'
import { connect } from 'react-redux'
import { setZoomed, setHighlights } from '../../../actions/uiState'
import { changeTab, selectNodes, unselectNodes, selectEdges, unselectEdges } from '../../../actions/network'
import { clearSelectedGenes } from '../../../actions/search'

let cyInstance = null

const PRESET_LAYOUT = {
  name: 'preset',
  padding: 6
}

const COCENTRIC_LAYOUT = {
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
  const highlights = props.uiState_highlights

  useEffect(() => {
    if (cyInstance === undefined || cyInstance === null) {
      return
    }

    cyInstance.on('tap', function(event) {
      try {
        cyInstance.nodes().removeClass('connected')
        const target = event.target
        if (target === cyInstance) {
          props.networkActions_changeTab(0)
          console.log('UNSELECT')
        }
      } catch (e) {
        console.warn(e)
      }
    })

    cyInstance.on('tap', 'node', function() {
      try {
        cyInstance.nodes().removeClass('connected')
      } catch (e) {
        console.warn(e)
      }
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
    })

    let nodeTimeout
    cyInstance.on('select', 'node', function() {
      clearTimeout(nodeTimeout)
      nodeTimeout = setTimeout(function() {
        const nodes = []
        const selectedNodes = cyInstance.$('node:selected')
        selectedNodes.forEach(element => {
          if (element.data().name != '') {
            nodes.push(element.data())
          }
        })
        props.networkActions_selectNodes(nodes)
      }, 1)
    })

    let nodeUnselectTimeout
    cyInstance.on('unselect', 'node', function() {
      clearTimeout(nodeUnselectTimeout)
      nodeUnselectTimeout = setTimeout(function() {
        const nodes = []
        const selectedNodes = cyInstance.$('node:selected')
        selectedNodes.forEach(element => {
          if (element.data().name != '') {
            nodes.push(element.data())
          }
        })
        props.networkActions_unselectNodes(nodes)
      }, 1)
    })

    let edgeTimeout
    cyInstance.on('select', 'edge', function() {
      clearTimeout(edgeTimeout)
      edgeTimeout = setTimeout(function() {
        const edges = []
        const selectedEdges = cyInstance.$('edge:selected')
        selectedEdges.forEach(element => {
          edges.push(element.data())
        })
        props.networkActions_selectEdges(edges)
      }, 1)
    })

    let edgeUnselectTimeout
    cyInstance.on('unselect', 'edge', function() {
      clearTimeout(edgeUnselectTimeout)
      edgeTimeout = setTimeout(function() {
        const edges = []
        const selectedEdges = cyInstance.$('edge:selected')
        selectedEdges.forEach(element => {
          edges.push(element.data())
        })
        props.networkActions_unselectEdges(edges)
      }, 1)
    })

    // Reset the UI state (hilight)
    props.uiStateActions_setHighlights(true)

    return () => {
      console.log('Network viewer unmounted')
    }
  }, [])

  useEffect(() => {
    if (cyInstance === undefined || cyInstance === null) {
      return
    }

    const targets = props.search_selectedGenes
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
  }, [props.search_selectedGenes])

  useEffect(() => {
    if (cyInstance === undefined || cyInstance === null) {
      return
    }

    const zoom = props.uiState_zoomed
    if (zoom === null || zoom === undefined) {
      return
    }

    if (zoom) {
      props.searchActions_clearSelectedGenes()
      props.uiStateActions_setZoomed(false)
    }
  }, [props.uiState_zoomed])

  const numObjects = props.network_nodeCount + props.network_edgeCount
  if (numObjects > MAX_NETWORK_SIZE) {
    return <Warning />
  }

  const cyjs = props.network_network
  if (cyjs === null || cyjs === undefined) {
    return null
  }

  const networkAreaStyle = {
    width: '100%',
    height: '100%',
    background: props.network_backgroundColor
  }

  const isLayoutAvailable = cyjs.isLayout

  let layout = PRESET_LAYOUT
  if (!isLayoutAvailable && cyjs.elements.length < 500) {
    layout = COSE_SETTING
  } else if (!isLayoutAvailable) {
    layout = COCENTRIC_LAYOUT
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

const mapStateToProps = state => {
  return {
    uiState_zoomed: state.uiState.zoomed,
    uiState_highlights: state.uiState.highlights,

    network_selectedNodes: state.network.selectedNodes,
    network_selectedEdges: state.network.selectedEdges,
    network_nodeCount: state.network.nodeCount,
    network_edgeCount: state.network.edgeCount,
    network_backgroundColor: state.network.backgroundColor,
    network_network: state.network.network,

    search_selectedGenes: state.search.selectedGenes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uiStateActions_setZoomed: (payload) => dispatch(setZoomed(payload)),
    uiStateActions_setHighlights: (payload) => dispatch(setHighlights(payload)),

    networkActions_changeTab: (payload) => dispatch(changeTab(payload)),
    networkActions_selectNodes: (payload) => dispatch(selectNodes(payload)),
    networkActions_unselectNodes: (payload) => dispatch(unselectNodes(payload)),
    networkActions_selectEdges: (payload) => dispatch(selectEdges(payload)),
    networkActions_unselectEdges: (payload) => dispatch(unselectEdges(payload)),

    searchActions_clearSelectedGenes: (payload) => dispatch(clearSelectedGenes(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (CytoscapeViewer)

