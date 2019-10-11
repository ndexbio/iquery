import React, { useEffect, useMemo, useState, useLayoutEffect } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'
import Cytoscape from 'cytoscape'
import CyCanvas from 'cytoscape-canvas'
import { CxToCyCanvas } from 'cyannotation-cx2js'
import { CONCENTRIC_LAYOUT, COSE_LAYOUT } from './LayoutSettings'
import { isEqual, cloneDeep } from 'lodash'

import './style.css'

// For supporting visual annotation
Cytoscape.use(CyCanvas)

// This is the global instance of Cytoscape.js
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
  const [startTime, setStartTime] = useState(new Date().getTime())
  const { highlights, fit } = props.uiState
  const { originalCX } = props.network
  const cyjs = props.network.network

  const [originalElements, setOriginalElements] = useState(() => {
    console.log('start clone ' + (new Date().getTime() - startTime))
    return cyjs ? cloneDeep(cyjs.elements) : null
  })
  console.log('stop clone ' + (new Date().getTime() - startTime))

  console.log('start preset layout ' + (new Date().getTime() - startTime))
  const PRESET_LAYOUT = {
    name: 'preset',
    padding: 6,
    animate: false,
    positions: function(node) {
      const id = node[0]._private.data.id
      const analog = originalElements.filter(elem => {
        return elem.data.id.toString() === id.toString()
      })
      const position = analog[0].position
      return position
    }
  }
  console.log('stop preset layout ' + (new Date().getTime() - startTime))
  const [layout, setLayout] = useState(PRESET_LAYOUT)
  let propLayouts
  let propLayout

  // Use default color if this property is not available.
  let backgroundColor = props.network.backgroundColor
  if (backgroundColor === null || backgroundColor === undefined) {
    backgroundColor = DEF_BG_COLOR
  }
  /*
  const niceCX = useMemo(() => {
    if (originalCX && layout.name === 'preset') {
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
        if (annotationEntry.length !== 0 && cyInstance) {
          const nice = utils.rawCXtoNiceCX(originalCX)
          console.log(
            '* Registering annotation renderer for this niceCX:',
            annotationEntry
          )
          new Promise(function(resolve, reject) {
            annotationRenderer.drawAnnotationsFromNiceCX(cyInstance, nice)
            annotationRenderer.drawBackground(cyInstance, backgroundColor)
            resolve()
          }).then(() => {
            props.networkActions.setAnnotations(true)
          })
          return nice
        }
      }
    }
    return null
  }, [originalCX, cyInstance])
*/
  const renderAnnotations = () => {
    console.log('start annotation ' + (new Date().getTime() - startTime))
    if (layout.name === 'preset' && originalCX) {
      const networkAttr = originalCX.filter(
        entry => entry.networkAttributes !== undefined
      )
      if (networkAttr !== undefined) {
        const firstEntry = networkAttr[0]
        if (
          firstEntry !== undefined &&
          firstEntry.networkAttributes != undefined
        ) {
          const netAttrArray = firstEntry.networkAttributes
          const annotationEntry = netAttrArray.filter(
            attr => attr.n === ANNOTATION_TAG
          )
          if (annotationEntry.length !== 0 && cyInstance) {
            const nice = utils.rawCXtoNiceCX(originalCX)
            console.log(
              '* Registering annotation renderer for this niceCX:',
              annotationEntry
            )
            annotationRenderer.drawAnnotationsFromNiceCX(cyInstance, nice)
            annotationRenderer.drawBackground(cyInstance, backgroundColor)
          }
        }
      }
    }
    console.log('stop annotation ' + (new Date().getTime() - startTime))
    return
  }

  /*
    Node/Edge Selections
   */

  useLayoutEffect(() => {
    console.log('start event handlers ' + (new Date().getTime() - startTime))
    // Event handler can be set only when Cytoscape.js instance is available.
    if (cyInstance === undefined || cyInstance === null) {
      return
    }

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

    console.log('start hook layout ' + (new Date().getTime() - startTime))
    // Reset the UI state (highlight)
    cyInstance.elements().addClass('faded')
    const query = cyInstance.filter('node[querynode = "true"]')
    query.addClass('highlight')

    //Layout
    if (cyjs != null) {
      const isLayoutAvailable = cyjs.isLayout
      if (isLayoutAvailable) {
        propLayouts = ['Preset', 'Cose', 'Concentric']
        propLayout = 'Preset'
        setLayout(PRESET_LAYOUT)
      } else {
        propLayouts = ['Cose', 'Concentric']
        if (cyjs.elements.length < 500) {
          propLayout = 'Cose'
          setLayout(COSE_LAYOUT)
        } else {
          propLayout = 'Concentric'
          setLayout(CONCENTRIC_LAYOUT)
        }
      }
    }

    new Promise(function(resolve, reject) {
      renderAnnotations()
      resolve()
    }).then(() => {
      props.uiStateActions.update({
        highlights: true,
        layouts: propLayouts,
        layout: propLayout
      })
    })
    console.log('stop hook layout ' + (new Date().getTime() - startTime))
    console.log('stop event handlers ' + (new Date().getTime() - startTime))
    return () => {
      console.log('Network viewer unmounted')
    }
  }, [])

  useEffect(() => {
    console.log('start selected genes ' + (new Date().getTime() - startTime))
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
    console.log('end selected genes ' + (new Date().getTime() - startTime))
  }, [props.search.selectedGenes])

  useEffect(() => {
    console.log('start fit ' + (new Date().getTime() - startTime))
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
      props.uiStateActions.fitNetworkView(false)
    }
    console.log('stop fit ' + (new Date().getTime() - startTime))
  }, [fit])

  useEffect(() => {
    console.log('start layout ' + (new Date().getTime() - startTime))
    switch (props.uiState.layout) {
      case 'Preset':
        setLayout(PRESET_LAYOUT)
        break
      case 'Cose':
        setLayout(COSE_LAYOUT)
        break
      case 'Concentric':
        setLayout(CONCENTRIC_LAYOUT)
        break
    }
    console.log('stop layout ' + (new Date().getTime() - startTime))
  }, [props.uiState.layout])

  console.log('start rest ' + (new Date().getTime() - startTime))

  // Render actual network
  if (cyjs === null || cyjs === undefined) {
    return null
  }

  // Network background should be set via CSS.
  const networkAreaStyle = {
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0)'
  }
  console.log('stop rest ' + (new Date().getTime() - startTime))

  console.log('start resize ' + (new Date().getTime() - startTime))
  if (cyInstance !== null) {
    cyInstance.resize()

    if (layout === COSE_LAYOUT || layout === CONCENTRIC_LAYOUT) {
      layout.stop = () => {
        setTimeout(() => {
          cyInstance.animate(
            {
              fit: {
                eles: cyInstance.elements(),
                padding: 6
              }
            },
            {
              duration: 0
            }
          )
        }, 0)
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
  console.log('stop resize ' + (new Date().getTime() - startTime))

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

const MemoCytoscapeViewer = React.memo(
  CytoscapeViewer,
  (oldProps, newProps) => {
    return (
      oldProps.uiState.fit === newProps.uiState.fit &&
      oldProps.uiState.layout === newProps.uiState.layout &&
      oldProps.uiState.highlights === newProps.uiState.highlights &&
      isEqual(oldProps.search.selectedGenes, newProps.search.selectedGenes)
    )
  }
)

export default MemoCytoscapeViewer
