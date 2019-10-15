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
import { setAnnotations } from '../../../actions/uiState'

// For supporting visual annotation
Cytoscape.use(CyCanvas)

// This is the global instance of Cytoscape.js
let cyInstance = null

//let first = true

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
  const [layout, setLayout] = useState(null)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  //Props
  const { originalCX } = props.network
  const cyjs = props.network.network

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
  const [layout, setLayout] = useState(PRESET_LAYOUT)

  // Use default color if this property is not available.
  let backgroundColor = props.network.backgroundColor
  if (backgroundColor === null || backgroundColor === undefined) {
    backgroundColor = DEF_BG_COLOR
  }

  /*
  let niceCX = useMemo(() => {
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
  }, [originalCX, cyInstance, layout])
  */

  const renderAnnotations = () => {
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
    return
  }

  /*
    Node/Edge Selections
   */
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

<<<<<<< HEAD
    console.log('enter' + (new Date().getTime() - startTime))

    setUuid(props.network.uuid)

    console.log('start layout' + (new Date().getTime() - startTime))

    //Layout
    if (cyjs.isLayout) {
      console.log('enter layout' + (new Date().getTime() - startTime))
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
=======
    //Layout
    let propLayouts
    let propLayout
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
>>>>>>> parent of d28d422... New examples
        }
      }
      setLayout(presetLayout)

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
            new Promise((resolve, reject) => {
              annotationRenderer.drawAnnotationsFromNiceCX(cyInstance, nice)
              annotationRenderer.drawBackground(
                cyInstance,
                props.network.backgroundColor
              )
              resolve()
            }).then(() => {
              console.log('start update' + (new Date().getTime() - startTime))
              props.uiStateActions.update({
                layouts: ['Preset', 'Cose', 'Concentric'],
                layout: 'Preset',
                annotations: true
              })
              console.log('stop update' + (new Date().getTime() - startTime))
              console.log('stop layout' + (new Date().getTime() - startTime))
            })
            console.log('stop annotation' + (new Date().getTime() - startTime))
          }
        }
      }
    } else {
      propLayouts = ['Cose', 'Concentric']
      if (cyjs.elements.length < 500) {
        propLayout = 'Cose'
        setLayout(COSE_LAYOUT)
      } else {
        propLayout = 'Concentric'
        setLayout(CONCENTRIC_LAYOUT)
      }
      console.log('start update' + (new Date().getTime() - startTime))
      props.uiStateActions.update({
<<<<<<< HEAD
        layouts: propLayouts,
        layout: propLayout
      })
      console.log('stop update' + (new Date().getTime() - startTime))
      console.log('stop layout' + (new Date().getTime() - startTime))
    }
  }, [])

  //Layout
  useEffect(() => {
    console.log('start layout effect' + (new Date().getTime() - startTime))
    if (layout && props.uiState.layout.toLowerCase() !== layout.name) {
      console.log('enter layout effect' + (new Date().getTime() - startTime))
      switch (props.uiState.layout) {
        case 'Preset':
          setLayout(presetLayout)
          break
        case 'Cose':
          setLayout(COSE_LAYOUT)
          break
        case 'Concentric':
          setLayout(CONCENTRIC_LAYOUT)
          break
      }
    }
    console.log('stop layout effect' + (new Date().getTime() - startTime))
  }, [props.uiState.layout])

  //Highlights
=======
        //fit: true,
        highlights: true,
        layouts: propLayouts,
        layout: propLayout
      })
    })

    return () => {
      console.log('Network viewer unmounted')
    }
  }, [])

>>>>>>> parent of d28d422... New examples
  useEffect(() => {
    console.log('start highlights effect' + (new Date().getTime() - startTime))
    console.log('enter highlights effect' + (new Date().getTime() - startTime))
    const query = cyInstance.filter('node[querynode = "true"]')

    if (props.uiState.highlights) {
      query.addClass('highlight')
    } else {
      query.removeClass('highlight')
    }
    console.log('stop highlights effect' + (new Date().getTime() - startTime))
  }, [props.uiState.highlights]) //, first])

  //Selected genes
  useEffect(() => {
    console.log(
      'start selected genes effect' + (new Date().getTime() - startTime)
    )
    if (props.search.selectedGenes != null) {
      console.log(
        'enter selected genes effect' + (new Date().getTime() - startTime)
      )
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
    console.log(
      'stop selected genes effect' + (new Date().getTime() - startTime)
    )
  }, [props.search.selectedGenes])

  //Fit
  useEffect(() => {
    console.log('start fit effect' + (new Date().getTime() - startTime))
    console.log('enter fit effect' + (new Date().getTime() - startTime))

    cyInstance.fit({
      eles: cyInstance.elements(),
      padding: 6
    })
    console.log('stop fit effect' + (new Date().getTime() - startTime))
  }, [props.uiState.fit])

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
