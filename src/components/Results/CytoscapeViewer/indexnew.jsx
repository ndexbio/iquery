import React, { useEffect, useMemo, useState, useLayoutEffect } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'
import Cytoscape from 'cytoscape'
import CyCanvas from 'cytoscape-canvas'
import { CxToCyCanvas } from 'cyannotation-cx2js'
import Warning from './Warning'
import { CONCENTRIC_LAYOUT, COSE_LAYOUT, PRESET_LAYOUT } from './LayoutSettings'
import { isEqual, cloneDeep } from 'lodash'

import './style.css'

export const MAX_NETWORK_SIZE = 5000

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
  let presetLayout = PRESET_LAYOUT
  const [layout, setLayout] = useState(null)
  const [networkAreaStyle, setNetworkAreaStyle] = useState(null)
  let propLayouts
  let propLayout

  const [originalElements, setOriginalElements] = useState(null)

  useLayoutEffect(() => {
    if (cyInstance != null) {
      //Functions
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
                annotationRenderer.drawBackground(
                  cyInstance,
                  props.network.backgroundColor
                )
              }
            }
          }
        }
        console.log('stop annotation ' + (new Date().getTime() - startTime))
        return
      }

      const setup = () => {
        //Layout
        if (cyjs != null) {
          const isLayoutAvailable = cyjs.isLayout
          if (isLayoutAvailable) {
            propLayouts = ['Preset', 'Cose', 'Concentric']
            propLayout = 'Preset'
            setOriginalElements(cloneDeep(cyjs.elements))
            presetLayout = {
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
            setLayout(presetLayout)
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
                  annotationRenderer.drawBackground(
                    cyInstance,
                    props.network.backgroundColor
                  )
                }
              }
            }
          }
        }
        console.log('stop annotation ' + (new Date().getTime() - startTime))
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

      //Event handlers
      // Background tapped: Remove selection
      // (This is the standard Cytosape UX)
      cyInstance.on('tap', function(event) {
        try {
          if (event.target === cyInstance) {
            props.networkActions.unselectEdges()
            props.networkActions.unselectNodes()
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

      //Background
      setNetworkAreaStyle({
        height: '100%',
        width: '100%',
        background: props.network.backgroundColor
          ? props.network.backgroundColor
          : DEF_BG_COLOR
      })

      //Layout
      if (cyjs != null) {
        const isLayoutAvailable = cyjs.isLayout
        if (isLayoutAvailable) {
          propLayouts = ['Preset', 'Cose', 'Concentric']
          propLayout = 'Preset'
          setOriginalElements(cloneDeep(cyjs.elements))
          presetLayout = {
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
          setLayout(presetLayout)
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

      //Annotations
      new Promise(function(resolve, reject) {
        setup()
        resolve()
      }).then(() => {
        props.uiStateActions.update({
          layouts: propLayouts,
          layout: propLayout
        })
      })
    }

    return () => {
      console.log('Network viewer unmounted')
    }
  }, [])

  //Layout
  useEffect(() => {
    if (layout && props.uiState.layout.toLowerCase() !== layout.name) {
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
    }
  }, [props.uiState.layout])

  //Highlights
  useEffect(() => {
    if (props.uiState.highlights) {
      cyInstance.elements().addClass('faded')
      const query = cyInstance.filter('node[querynode = "true"]')
      query.addClass('highlight')
    } else {
      cyInstance
        .elements()
        .removeClass('faded')
        .removeClass('highlight')
    }
  }, [props.uiState.highlights])

  //Selected genes
  useEffect(() => {
    console.log('start selected genes ' + (new Date().getTime() - startTime))
    if (cyInstance != null && props.search.selectedGenes != null) {
      const targets = props.search.selectedGenes
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
    }
    console.log('end selected genes ' + (new Date().getTime() - startTime))
  }, [props.search.selectedGenes])

  //Fit
  useEffect(() => {
    console.log('start fit ' + (new Date().getTime() - startTime))
    if (cyInstance === undefined || cyInstance === null) {
      return
    }
    if (props.uiState.fit) {
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
  }, [props.uiState.fit])

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
      oldProps.uiState.layout === newProps.uiState.layout &&
      oldProps.uiState.highlights === newProps.uiState.highlights
    )
  }
)

export default MemoCytoscapeViewer
