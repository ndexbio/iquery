import React, { useEffect, useLayoutEffect, useState } from 'react'

import CytoscapeComponent from 'react-cytoscapejs'
import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'
import Cytoscape from 'cytoscape'
import CyCanvas from 'cytoscape-canvas'
import { CxToCyCanvas } from 'cyannotation-cx2js'
import { CONCENTRIC_LAYOUT, COSE_LAYOUT } from './LayoutSettings'

import { cloneDeep } from 'lodash'

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

const CytoscapeViewer = props => {
  const [startTime, setStartTime] = useState(new Date().getTime())

  //Props
  const cyjs = props.network.network
  const { originalCX } = props.network
  const { fit, highlights, layout } = props.uiState
  const { selectedGenes } = props.search

  //Local vars
  let localLayout
  let networkAreaStyle
  let propLayouts
  let propLayout
  let originalElements
  let presetLayout

  /* Just useEffect? */
  useEffect(() => {
    //Event listeners
    console.log('start event listeners ' + (new Date().getTime() - startTime))

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

    console.log('stop event listeners' + (new Date().getTime() - startTime))

    console.log('start network area style' + (new Date().getTime() - startTime))

    //Network area style
    networkAreaStyle = {
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0)'
    }

    console.log('stop network area style' + (new Date().getTime() - startTime))

    console.log('start layout' + (new Date().getTime() - startTime))

    //Initial layout
    if (cyjs.isLayout) {
      console.log('enter layout' + (new Date().getTime() - startTime))

      propLayouts = ['Preset', 'Cose', 'Concentric']
      propLayout = 'Preset'
      originalElements = cloneDeep(cyjs.elements)
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
      localLayout = presetLayout

      //Annotation
      console.log('start annotation' + (new Date().getTime() - startTime))

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
            console.log('stop annotation' + (new Date().getTime() - startTime))
          }
        }
      }
    } else {
      propLayouts = ['Cose', 'Concentric']
      if (cyjs.elements.length < 500) {
        propLayout = 'Cose'
        localLayout = COSE_LAYOUT
      } else {
        propLayout = 'Concentric'
        localLayout = CONCENTRIC_LAYOUT
      }
    }
    console.log('stop layout' + (new Date().getTime() - startTime))

    console.log('start update' + (new Date().getTime() - startTime))

    props.uiStateActions.update({
      layouts: propLayouts,
      layout: propLayout
    })
    console.log('stop update' + (new Date().getTime() - startTime))

    console.log('start highlight' + (new Date().getTime() - startTime))

    //Initial highlights
    cyInstance.elements().addClass('faded')
    const query = cyInstance.filter('node[querynode = "true"]')
    query.addClass('highlight')
    console.log('stop highlights' + (new Date().getTime() - startTime))

    console.log('start resize' + (new Date().getTime() - startTime))

    //Initial fit
    cyInstance.resize()
    console.log('stop resize' + (new Date().getTime() - startTime))
  }, [])

  //Layout
  useEffect(() => {
    console.log('start layout effect' + (new Date().getTime() - startTime))
    if (localLayout && layout.toLowerCase() !== localLayout.name) {
      console.log('enter layout effect' + (new Date().getTime() - startTime))
      switch (layout) {
        case 'Preset':
          localLayout = presetLayout
          break
        case 'Cose':
          localLayout = COSE_LAYOUT
          break
        case 'Concentric':
          localLayout = CONCENTRIC_LAYOUT
          break
      }
    }
    console.log('stop layout effect' + (new Date().getTime() - startTime))
  }, [layout])

  //Highlights
  useEffect(() => {
    console.log('start highlights effect' + (new Date().getTime() - startTime))
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
    console.log('stop highlights effect' + (new Date().getTime() - startTime))
  }, [highlights])

  //Selected genes
  useEffect(() => {
    console.log(
      'start selected genes effect' + (new Date().getTime() - startTime)
    )
    if (selectedGenes != null) {
      console.log(
        'enter selected genes effect' + (new Date().getTime() - startTime)
      )

      const selected = cyInstance.elements(
        'node[name = "' + selectedGenes[0] + '"]'
      )
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
      if (selectedGenes.length === 0) {
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
    console.log(
      'stop selected genes effect' + (new Date().getTime() - startTime)
    )
  }, [selectedGenes])

  //Fit
  useEffect(() => {
    console.log('start fit effect' + (new Date().getTime() - startTime))
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
    console.log('stop fit effect' + (new Date().getTime() - startTime))
  }, [fit])

  if (cyInstance == null) {
    console.log('return null' + (new Date().getTime() - startTime))
    return (
      <CytoscapeComponent
        cy={cy => {
          cyInstance = cy
        }}
      />
    )
  } else {
    console.log('return' + (new Date().getTime() - startTime))
    return (
      <CytoscapeComponent
        elements={cyjs.elements}
        layout={localLayout}
        style={networkAreaStyle}
        stylesheet={cyjs.style}
        cy={cy => {
          cyInstance = cy
        }}
      />
    )
  }
}

const MemoCytoscapeViewer = React.memo(
  CytoscapeViewer,
  (oldProps, newProps) => {
    console.log('memo')
    return (
      oldProps.uiState.layout === newProps.uiState.layout &&
      oldProps.uiState.highlights === newProps.uiState.highlights &&
      oldProps.uiState.fit === newProps.uiState.fit &&
      oldProps.search.selectedGenes === newProps.search.selectedGenes &&
      oldProps.network.network === newProps.network.network
    )
  }
)

export default CytoscapeViewer
