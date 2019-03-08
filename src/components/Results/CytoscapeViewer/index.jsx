import React, { useEffect } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

import './style.css'
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

  useEffect(() => {
    if (cyInstance === undefined || cyInstance === null) {
      return
    }
    console.log('This should run only once:  CyViewer Mounted:', cyInstance)

    cyInstance.on('tap', function(event) {
      try {
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
        const selected = this.data()
        props.networkActions.selectNode(selected)
      } catch (e) {
        console.warn(e)
      }
    })

    cyInstance.on('tap', 'edge', function() {
      try {
        const selected = this.data()
        props.networkActions.selectEdge(selected)
      } catch (e) {
        console.warn(e)
      }
    })

    return () => {
      console.log('unmount')
    }
  }, [])

  const cyjs = props.network.network
  const selectedGenes = props.search.selectedGenes

  if (cyjs === null || cyjs === undefined) {
    return null
  }

  console.log('Rendering Cyjs ===', cyjs, selectedGenes)
  // if (selectedGenes.length !== 0) {
  //   console.log('=========== SL found:', selectedGenes)
  //   cyjs.style.push({
  //     style: {
  //       'background-color': 'red'
  //     },
  //     selector: 'node:selected'
  //   })
  //
  //   if(cyInstance !== undefined || cyInstance !== null) {
  //     // test reaction
  //     const name = selectedGenes[0]
  //     cyInstance.elements('node[name = "'+ name + '"]').style('background-color', 'red')
  //   }
  // }



  console.log('=========== **Style:', cyjs.style)

  return (
    <CytoscapeComponent
      elements={cyjs.elements}
      layout={{ name: 'preset' }}
      style={{ width: '100%', height: '100%' }}
      stylesheet={cyjs.style}
      cy={cy => (cyInstance = cy)}
    />
  )
}


export default CytoscapeViewer
