import React, {
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
  useReducer
} from 'react'
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

let first = true

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
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  //Props
  const { originalCX } = props.network
  const cyjs = props.network.network

  //Variables
  let propLayouts
  let propLayout
  let originalElements
  let presetLayout
  let layout
  const networkAreaStyle = {
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0)'
  }

  const [uuid, setUuid] = useState(null)
  //const [first, setFirst] = useState(true)

  useEffect(() => {
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
  }, [])

  //Layout
  useEffect(() => {
    console.log('start layout effect' + (new Date().getTime() - startTime))
    if (!first) {
      if (layout && props.uiState.layout.toLowerCase() !== layout.name) {
        console.log('enter layout effect' + (new Date().getTime() - startTime))
        switch (props.uiState.layout) {
          case 'Preset':
            layout = presetLayout
            break
          case 'Cose':
            layout = COSE_LAYOUT
            break
          case 'Concentric':
            layout = CONCENTRIC_LAYOUT
            break
        }
      }
    }
    console.log('stop layout effect' + (new Date().getTime() - startTime))
  }, [props.uiState.layout, first])

  //Highlights
  useEffect(() => {
    console.log('start highlights effect' + (new Date().getTime() - startTime))
    if (!first) {
      console.log(
        'enter highlights effect' + (new Date().getTime() - startTime)
      )
      const query = cyInstance.filter('node[querynode = "true"]')

      if (props.uiState.highlights) {
        //cyInstance.elements().addClass('faded')
        query.addClass('highlight')
      } else {
        query
          //cyInstance
          //.elements()
          //.removeClass('faded')
          .removeClass('highlight')
      }
    }
    console.log('stop highlights effect' + (new Date().getTime() - startTime))
  }, [props.uiState.highlights, first])

  //Selected genes
  useEffect(() => {
    console.log(
      'start selected genes effect' + (new Date().getTime() - startTime)
    )
    if (!first) {
      if (props.search.selectedGenes != null) {
        console.log(
          'enter selected genes effect' + (new Date().getTime() - startTime)
        )
        const targets = props.search.selectedGenes
        const selected = cyInstance.elements(
          'node[name = "' + targets[0] + '"]'
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
    }
    console.log(
      'stop selected genes effect' + (new Date().getTime() - startTime)
    )
  }, [props.search.selectedGenes, first])

  //Fit
  useEffect(() => {
    console.log('start fit effect' + (new Date().getTime() - startTime))
    if (!first) {
      console.log('enter fit effect' + (new Date().getTime() - startTime))

      //if (props.uiState.fit) {
      cyInstance.fit({
        eles: cyInstance.elements(),
        padding: 6
      })
      /*
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
      )*/
    }
    //props.uiStateActions.fitNetworkView(false)
    //}
    console.log('stop fit effect' + (new Date().getTime() - startTime))
  }, [props.uiState.fit, first])

  useEffect(() => {
    if (first) {
      console.log('enter first' + (new Date().getTime() - startTime))
      first = false
      forceUpdate()
    }
  }, [first])
  /*
  useEffect(() => {
    //if (!first) {
      console.log('start highlights' + (new Date().getTime() - startTime))
      //Highlights
      const query = cyInstance.filter('node[querynode = "true"]')
      query.addClass('highlight')
      /*
      setTimeout(() => {
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
      }, 1)
      console.log('stop highlights' + (new Date().getTime() - startTime))
    //}
  }, [first])
*/
  if (props.network.network == null || cyInstance == null) {
    console.log('null' + (new Date().getTime() - startTime))

    return (
      <CytoscapeComponent
        cy={cy => {
          cyInstance = cy
        }}
      />
    )
  }

  console.log('not null' + (new Date().getTime() - startTime))

  console.log(uuid)
  console.log(props.network.uuid)
  if (uuid !== props.network.uuid) {
    console.log('enter' + (new Date().getTime() - startTime))

    setUuid(props.network.uuid)

    console.log('start layout' + (new Date().getTime() - startTime))

    //Layout
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
      layout = presetLayout

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
        layout = COSE_LAYOUT
      } else {
        propLayout = 'Concentric'
        layout = CONCENTRIC_LAYOUT
      }
    }
    console.log('stop layout' + (new Date().getTime() - startTime))

    console.log('start update' + (new Date().getTime() - startTime))

    props.uiStateActions.update({
      layouts: propLayouts,
      layout: propLayout
    })
    console.log('stop update' + (new Date().getTime() - startTime))
  }

  console.log('return' + (new Date().getTime() - startTime))

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
      oldProps.uiState.highlights === newProps.uiState.highlights &&
      oldProps.uiState.fit === newProps.uiState.fit &&
      oldProps.search.selectedGenes === newProps.search.selectedGenes &&
      oldProps.network.network === newProps.network.network
    )
  }
)

export default MemoCytoscapeViewer
