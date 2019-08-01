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

let edgeCounter = 0

let extState = {}

/**
 *
 * Simple wrapper for cytoscape.js react component
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const CytoscapeViewer = props => {
  const [collapsedEdges, setCollapsedEdges] = useState({})
  console.log('=================Current state::::', collapsedEdges)

  const { highlights } = props.uiState

  useEffect(() => {
    console.log('*****************colUP::::Current state::::', collapsedEdges)
  }, collapsedEdges)

  useEffect(test => {
    console.log(
      '+++++++++++++++++++++++++++++INSIDE::::Current state::::',
      collapsedEdges,
      test
    )
    if (cyInstance === undefined || cyInstance === null) {
      return
    }

    cyInstance.on('tap', function(event) {
      try {
        cyInstance.nodes().removeClass('connected')
        const target = event.target
        if (target === cyInstance) {
          props.networkActions.deselectAll()
          console.log('UNSELECT')
        }
      } catch (e) {
        console.warn(e)
      }
    })

    cyInstance.on('tap', 'node', function() {
      try {
        cyInstance.nodes().removeClass('connected')
        const selected = this.data()
        props.networkActions.selectNode(selected)
      } catch (e) {
        console.warn(e)
      }
    })

    let tappedBefore
    let tappedTimeout

    cyInstance.on('tap', 'edge', event => {
      let tappedNow = event.target
      if (tappedTimeout && tappedBefore) {
        clearTimeout(tappedTimeout)
      }

      if (tappedBefore === tappedNow) {
        tappedNow.emit('dblTap')
        tappedBefore = null
        return
      } else {
        tappedTimeout = setTimeout(function() {
          tappedBefore = null
        }, 200)
        tappedBefore = tappedNow
      }

      try {
        const selected = tappedNow.data()
        console.log('Run all ET event:', event, selected)
        // cyInstance.nodes().removeClass('connected')
        // const { source, target } = selected
        // cyInstance.$('#' + source + ', #' + target).addClass('connected')

        props.networkActions.selectEdge(selected)
      } catch (e) {
        console.warn(e)
      }
    })

    cyInstance.on('dblTap', 'edge', event => {
      const selectedEdge = event.target
      const eData = selectedEdge.data()
      const { source, target, id } = eData

      let currentState = null
      setCollapsedEdges(lastState => {
        currentState = lastState
        return { ...lastState }
      })
      // Check this edge is collapsed one or not

      const collapsed = currentState[id]
      console.log(
        '22##Selected edge and state:::',
        currentState,
        event,
        eData,
        collapsedEdges
      )

      if (collapsed !== undefined) {
        console.log('!!!!!!!!!!!!!!!!!!!!!collapes edge:', eData, collapsed)
        const toBeRestored = collapsed.connectingEdges
        console.log('!!!!!!!!!!!!!!!!!!!!!RESTORE:', toBeRestored)
        cyInstance.remove(selectedEdge)
        cyInstance.add(toBeRestored)

        setCollapsedEdges(lastState => {
          const newState = { ...lastState }
          delete newState[id]

          console.log('NEW State:', newState)
          return newState
        })

        return
      }

      const s = cyInstance.$('#' + source)
      const t = cyInstance.$('#' + target)
      const connectingEdges = s.edgesWith(t)

      if (connectingEdges.size() === 1) {
        console.log('# Single Edge = 1', connectingEdges)
        return
      }

      console.log('-----Connecting Edges', connectingEdges)

      // Create new collapsed edge

      const newEdgeId = 'collapsed' + edgeCounter++
      const newEdge = {
        data: {
          source,
          target,
          id: newEdgeId
        }
      }

      const edgeRecord = {
        selectedEdge,
        connectingEdges
      }

      setCollapsedEdges(last => ({ ...last, [newEdgeId]: edgeRecord }))

      cyInstance.remove(connectingEdges)
      const newEdgeInstance = cyInstance.add(newEdge)

      // Apply custom style
      const width = connectingEdges.size() * 1.5
      newEdgeInstance.style({
        width,
        'line-style': 'dotted',
        'text-rotation': 'autorotate',
        label: 'Bundled ' + connectingEdges.size() + ' Edges',
        color: '#555555',
        'text-margin-y': width + 10,
        'line-color': '#FF0000'
      })
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
    if (targets === null || targets === undefined || targets.length === 0) {
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
    } else {
      cyInstance.animate(
        {
          fit: {
            eles: cyInstance.elements(),
            padding: 10
          }
        },
        {
          duration: 500
        }
      )
    }
  }, [props.search.selectedGenes])

  const numObjects = props.network.nodeCount + props.network.edgeCount
  if (numObjects > MAX_NETWORK_SIZE) {
    return <Warning />
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
