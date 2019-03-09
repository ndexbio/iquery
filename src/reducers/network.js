import { handleActions } from 'redux-actions'
import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'

import * as vs from '../assets/data/custom-visual-style.json'


import {
  networkFetchStarted,
  networkFetchFailed,
  networkFetchSucceeded,
  selectNode,
  selectEdge,
  deselectAll
} from '../actions/network'

const defaultState = {
  isFetching: false,
  uuid: '',
  jobId: '',
  sourceId: '',
  networkName: '',
  queryGenes: [],
  network: null,
  selectedNode: null,
  selectedEdge: null
}



const utils = new CyNetworkUtils()
const cx2js = new CxToJs(utils)


const PRESET_VS = vs.default[0].style

// Standard selection
PRESET_VS.push({
  selector: 'node:selected',
  css: {
    'background-color': 'red',
    color: '#FFFFFF',
    'background-opacity': 1,
    'border-width': 0,
    width: 100,
    height: 100
  }
})

const network = handleActions(
  {
    [networkFetchStarted]: (state, payload) => {
      return {
        ...state,
        isFetching: true,
        jobId: payload.payload.id,
        sourceId: payload.payload.sourceUUID,
        uuid: payload.payload.networkUUID,
        networkName: payload.payload.networkName,
        queryGenes: payload.payload.geneList
      }
    },
    [networkFetchSucceeded]: (state, payload) => {
      return {
        ...state,
        network: convertCx2cyjs(payload.cx, state.queryGenes),
        isFetching: false
      }
    },
    [networkFetchFailed]: (state, payload) => {
      return { ...state, network: null, isFetching: false }
    },
    [selectNode]: (state, payload) => {
      return { ...state, selectedNode: payload.payload }
    },
    [selectEdge]: (state, payload) => {
      return { ...state, selectedEdge: payload.payload }
    },
    [deselectAll]: (state, payload) => {
      return { ...state, selectedNode: null, selectedEdge: null }
    }
  },
  defaultState
)

const convertCx2cyjs = (cx, queryGenes) => {
  const niceCX = utils.rawCXtoNiceCX(cx)
  console.log('NICE ===', niceCX)

  const attributeNameMap = {}
  const elementsObj = cx2js.cyElementsFromNiceCX(niceCX, attributeNameMap)
  const style = cx2js.cyStyleFromNiceCX(niceCX, attributeNameMap)

  const updatedStyle = styleUpdater(PRESET_VS, queryGenes)

  const elements = [...elementsObj.nodes, ...elementsObj.edges]
  return {
    elements,
    style: updatedStyle
  }
}

const styleUpdater = style => {




  // PRESET_VS.push({
  //   selector: 'node:selected',
  //   css: {
  //     'background-color': 'red',
  //     width: 100,
  //     height: 100
  //   }
  // })
  // for (let idx = 0; i < len; i++) {
  //   const element = style[idx]
  //
  //   const { css, selector } = element
  //
  //   if (selector !== 'node:selected') {
  //     console.log('EL**Style:', element)
  //     newStyle.push(element)
  //   } else {
  //     element.css['background'] = 'red'
  //     newStyle.push(element)
  //   }
  // }
  return PRESET_VS
}

export default network
