import React, { useEffect, useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'
import './style.css'
import Warning from './Warning'
import { CONCENTRIC_LAYOUT, COSE_LAYOUT, PRESET_LAYOUT } from './LayoutSettings'

export const MAX_NETWORK_SIZE = 5000

let cyInstance = null

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
  const { fit } = props.network

  /*
    Node/Edge Selections
   */
  useEffect(() => {
    // Event handler can be set only when Cytoscape.js instance is available.
    if (cyInstance === undefined || cyInstance === null) {
      return
    }

    // Event handlers

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

  const networkAreaStyle = {
    width: '100%',
    height: '100%',
    background: props.network.backgroundColor
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

const drawAnnotations = (cyInstance, originalCX) => {
  var utils = new CyNetworkUtils()
  var cx2Js = new CxToJs(utils)
  const niceCX = utils.rawCXtoNiceCX(originalCX)
  drawAnnotationsFromNiceCX(cyInstance, niceCX, cx2Js)
}

const drawAnnotationsFromNiceCX = (cytoscapeInstance, niceCX, cx2Js) => {
  const annotationElements = getAnnotationElementsFromNiceCX(niceCX)
  drawAnnotationsFromAnnotationElements(
    cytoscapeInstance,
    annotationElements,
    cx2Js
  )
}

const getAnnotationElementsFromNiceCX = niceCX => {
  if (niceCX['networkAttributes']) {
    return niceCX['networkAttributes']['elements'].filter(function(element) {
      return element['n'] == '__Annotations'
    })
  } else {
    return []
  }
}

const drawAnnotationsFromAnnotationElements = (
  cytoscapeInstance,
  annotationElements,
  cx2Js
) => {
  const bottomLayer = cytoscapeInstance.cyCanvas({
    zIndex: -1
  })

  const topLayer = cytoscapeInstance.cyCanvas({
    zIndex: 1
  })

  const bottomCanvas = bottomLayer.getCanvas()
  const bottomCtx = bottomCanvas.getContext('2d')

  const topCanvas = topLayer.getCanvas()
  const topCtx = topCanvas.getContext('2d')

  cytoscapeInstance.on('render cyCanvas.resize', evt => {
    var colorFromInt = this._colorFromInt
    var shapeFunctions = this._shapeFunctions
    //console.log("render cyCanvas.resize event");
    bottomLayer.resetTransform(bottomCtx)
    bottomLayer.clear(bottomCtx)
    bottomLayer.setTransform(bottomCtx)

    bottomCtx.save()

    topLayer.resetTransform(topCtx)
    topLayer.clear(topCtx)
    topLayer.setTransform(topCtx)

    topCtx.save()

    var indexedAnnotations = {}
    var topAnnotations = []
    var bottomAnnotations = []

    annotationElements.forEach(function(element) {
      element['v'].forEach(function(annotation) {
        var annotationKVList = annotation.split('|')
        var annotationMap = {}
        annotationKVList.forEach(function(annotationKV) {
          var kvPair = annotationKV.split('=')
          annotationMap[kvPair[0]] = kvPair[1]
        })

        indexedAnnotations[annotationMap['uuid']] = annotationMap

        if (annotationMap['canvas'] == 'foreground') {
          topAnnotations.push(annotationMap['uuid'])
        } else {
          bottomAnnotations.push(annotationMap['uuid'])
        }
      })
    })
    var zOrderCompare = function(a, b) {
      let annotationA = indexedAnnotations[a]
      let annotationB = indexedAnnotations[b]
      return parseInt(annotationB['z']) - parseInt(annotationA['z'])
    }

    topAnnotations.sort(zOrderCompare)
    bottomAnnotations.sort(zOrderCompare)

    var contextAnnotationMap = [
      { context: topCtx, annotations: topAnnotations },
      { context: bottomCtx, annotations: bottomAnnotations }
    ]
    contextAnnotationMap.forEach(function(contextAnnotationPair) {
      let ctx = contextAnnotationPair.context
      contextAnnotationPair.annotations.forEach(function(annotationUUID) {
        let annotationMap = indexedAnnotations[annotationUUID]
        if (
          annotationMap['type'] ===
            'org.cytoscape.view.presentation.annotations.ShapeAnnotation' ||
          annotationMap['type'] ===
            'org.cytoscape.view.presentation.annotations.BoundedTextAnnotation'
        ) {
          //ctx.beginPath();
          ctx.lineWidth = annotationMap['edgeThickness']

          annotationMap['width'] =
            parseFloat(annotationMap['width']) /
            parseFloat(annotationMap['zoom'])
          annotationMap['height'] =
            parseFloat(annotationMap['height']) /
            parseFloat(annotationMap['zoom'])
          if (shapeFunctions[annotationMap['shapeType']]) {
            ctx.strokeStyle = colorFromInt(
              annotationMap['edgeColor'],
              annotationMap['edgeOpacity']
            )
            shapeFunctions[annotationMap['shapeType']](annotationMap, ctx)

            //ctx.stroke();
          } else {
            console.warn('Invalid shape type: ' + annotationMap['shapeType'])
          }
        } else if (
          annotationMap['type'] ===
          'org.cytoscape.view.presentation.annotations.ArrowAnnotation'
        ) {
          if (
            annotationMap['targetAnnotation'] &&
            annotationMap['sourceAnnotation']
          ) {
            let sourceAnnotation =
              indexedAnnotations[annotationMap['sourceAnnotation']]
            let targetAnnotation =
              indexedAnnotations[annotationMap['targetAnnotation']]
            ctx.stroke()
          }
        }

        var text
        var textX
        var textY

        if (
          annotationMap['type'] ===
          'org.cytoscape.view.presentation.annotations.TextAnnotation'
        ) {
          text = annotationMap['text']
          ctx.textBaseline = 'top'
          ctx.textAlign = 'left'
          textX = annotationMap['x']
          textY = annotationMap['y']
        } else if (
          annotationMap['type'] ===
          'org.cytoscape.view.presentation.annotations.BoundedTextAnnotation'
        ) {
          text = annotationMap['text']

          ctx.textBaseline = 'middle'
          ctx.textAlign = 'center'

          textX = parseFloat(annotationMap['x']) + annotationMap['width'] / 2
          textY = parseFloat(annotationMap['y']) + annotationMap['height'] / 2
        }
        if (text && textX && textY) {
          var fontSize =
            parseFloat(annotationMap['fontSize']) /
            parseFloat(annotationMap['zoom'])
          var fontFamily

          if (annotationMap['fontFamily']) {
            if (
              cx2Js.JavaLogicalFontConstants.FONT_FAMILY_LIST.includes(
                annotationMap['fontFamily']
              )
            ) {
              fontFamily =
                cx2Js.JavaLogicalFontConstants.FONT_STACK_MAP[
                  annotationMap['fontFamily']
                ]
            } else if (
              cx2Js.CommonOSFontConstants.FONT_STACK_MAP[
                annotationMap['fontFamily']
              ]
            ) {
              fontFamily =
                cx2Js.CommonOSFontConstants.FONT_STACK_MAP[
                  annotationMap['fontFamily']
                ]
            } else {
              fontFamily = 'sans-serif'
            }
          }
          ctx.font = fontSize + 'px ' + fontFamily

          if (annotationMap['color']) {
            ctx.fillStyle = colorFromInt(annotationMap['color'], '99')
          }
          ctx.fillText(text.toString(), textX, textY)
        }
      })
    })

    topCtx.restore()
    bottomCtx.restore()
  })
}

export default CytoscapeViewer
