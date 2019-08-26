import React, { useEffect, useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import './style.css'
import Warning from './Warning'

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

    cyInstance.on('select', 'node', function() {
      const selected = this.data()
      if (selected.name !== '') {
        props.networkActions_selectNodes(selected)
      }
    })

    cyInstance.on('unselect', 'node', function() {
      const unselected = this.data()
      if (unselected.name !== '') {
        props.networkActions_unselectNodes(unselected)
      }
    })
    
    cyInstance.on('select', 'edge', function() {
      const selected = this.data()
      props.networkActions_selectEdges(selected)
    })

    cyInstance.on('unselect', 'edge', function() {
      const unselected = this.data()
      props.networkActions_unselectEdges(unselected)
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
      console.log(cyInstance.elements())
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

export default CytoscapeViewer
