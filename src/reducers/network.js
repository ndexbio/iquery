import { handleActions, combineActions } from 'redux-actions'
import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'

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
  network: null,
  selectedNode: null,
  selectedEdge: null
}

const utils = new CyNetworkUtils()
const cx2js = new CxToJs(utils)

const network = handleActions(
  {
    [networkFetchStarted]: (state, payload) => {
      return {
        ...state,
        isFetching: true,
        uuid: payload
      }
    },
    [networkFetchSucceeded]: (state, payload) => {
      return {
        ...state,
        network: convertCx2cyjs(payload.cx),
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

const convertCx2cyjs = cx => {
  const niceCX = utils.rawCXtoNiceCX(cx)
  console.log('NICE ===', niceCX)

  const attributeNameMap = {}
  const elementsObj = cx2js.cyElementsFromNiceCX(niceCX, attributeNameMap)
  const style = cx2js.cyStyleFromNiceCX(niceCX, attributeNameMap)

  const elements = [...elementsObj.nodes, ...elementsObj.edges]
  return {
    elements,
    style
  }
}

export default network
