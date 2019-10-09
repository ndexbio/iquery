import { handleActions } from 'redux-actions'
import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'
import { MAX_NETWORK_SIZE } from '../components/Results/CytoscapeViewer'
import * as vs from '../assets/data/styles.json'

import {
  networkFetchStarted,
  networkFetchFailed,
  networkFetchSucceeded,
  networkClear,
  selectNodes,
  unselectNodes,
  selectEdges,
  unselectEdges,
  deselectAll,
  changeTab,
  changeListIndex,
  fitNetworkView
} from '../actions/network'

const defaultState = {
  isFetching: false,
  uuid: '',
  jobId: '',
  sourceId: '',
  networkName: '',
  queryGenes: [],
  hitGenes: [],
  originalCX: null,
  network: null,
  nodeCount: 0,
  edgeCount: 0,
  isLayoutComplete: false,
  selectedNodes: [],
  selectedEdges: [],
  tableDisplayTab: 0,
  listIndex: 0,
  fit: false
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

// For class-based style update
const fadedNode = {
  selector: 'node.faded',
  css: {
    opacity: 0.9
  }
}

const fadedEdge = {
  selector: 'edge.faded',
  css: {
    opacity: 0.9
  }
}

const highlight = {
  selector: '.highlight',
  css: {
    opacity: 1.0,
    'overlay-color': '#C51162',
    'overlay-padding': 12,
    'overlay-opacity': 0.5
  }
}

const activeObject = {
  selector: 'node:active',
  css: {
    'overlay-color': '#FFFF66',
    'overlay-padding': 25,
    'overlay-opacity': 0.3
  }
}

const network = handleActions(
  {
    [networkFetchStarted]: (state, payload) => {
      console.log('Query start: genes = ', payload)
      return {
        ...state,
        isFetching: true,
        nodeCount: payload.payload.nodeCount,
        edgeCount: payload.payload.edgeCount,
        jobId: payload.payload.id,
        sourceId: payload.payload.sourceUUID,
        uuid: payload.payload.networkUUID,
        networkName: payload.payload.networkName,
        queryGenes: payload.payload.geneList,
        hitGenes: payload.payload.hitGenes,
        originalCX: null,
        network: null,
        isLayoutComplete: false,
        backgroundColor: '',
        selectedNodes: [],
        selectedEdges: [],
        tableDisplayTab: 0,
        layout: 'Preset',
        layouts: []
      }
    },
    [networkFetchSucceeded]: (state, payload) => {
      const originalCX = payload.cx
      let network = {}
      let backgroundColor = {}
      if (state.nodeCount + state.edgeCount <= MAX_NETWORK_SIZE) {
        try {
          const cyjsNetwork = convertCx2cyjs(originalCX, state.queryGenes)
          network = cyjsNetwork
        } catch (err) {
          // This is an error state
          console.warn('Could not convert given CX to CYJS:', err)
          throw new Error('Could not convert given CX to CYJS:', err)
        }

        backgroundColor = getBackGround(originalCX)
      }

      return {
        ...state,
        originalCX,
        network,
        backgroundColor,
        isFetching: false
      }
    },
    [networkFetchFailed]: (state, payload) => {
      return {
        ...state,
        network: null,
        originalCX: null,
        isFetching: false,
        nodeCount: undefined,
        edgeCount: undefined
      }
    },
    [networkClear]: (state, payload) => {
      return {
        ...state,
        uuid: '',
        networkName: '',
        originalCX: null,
        network: null,
        backgroundColor: null,
        isFetching: false,
        nodeCount: undefined,
        edgeCount: undefined,
        layout: 'Default'
      }
    },
    [selectNodes]: (state, payload) => {
      return {
        ...state,
        tableDisplayTab: 1,
        selectedNodes: payload.payload
      }
    },
    [unselectNodes]: (state, payload) => {
      return {
        ...state,
        selectedNodes: []
      }
    },
    [selectEdges]: (state, payload) => {
      return {
        ...state,
        tableDisplayTab: 2,
        selectedEdges: payload.payload
      }
    },
    [unselectEdges]: (state, payload) => {
      return {
        ...state,
        selectedEdges: []
      }
    },
    [deselectAll]: (state, payload) => {
      return {
        ...state,
        tableDisplayTab: 0,
        selectedNodes: [],
        selectedEdges: []
      }
    },
    [changeTab]: (state, payload) => {
      return {
        ...state,
        tableDisplayTab: payload.payload
      }
    },
    [changeListIndex]: (state, payload) => {
      return {
        ...state,
        listIndex: payload.payload
      }
    }
  },
  defaultState
)

const convertCx2cyjs = (cx, queryGenes) => {
  const niceCX = utils.rawCXtoNiceCX(cx)
  const attributeNameMap = {}
  const elementsObj = cx2js.cyElementsFromNiceCX(niceCX, attributeNameMap)

  // This contains original style.
  const style = cx2js.cyStyleFromNiceCX(niceCX, attributeNameMap)

  const newStyle = styleUpdater(style)

  // const updatedStyle = styleUpdater(PRESET_VS, queryGenes)
  const updatedNodes = adjustLayout(elementsObj.nodes, queryGenes)
  const elements = [...updatedNodes, ...elementsObj.edges]
  return {
    elements,
    style: newStyle,
    isLayout: checkLayout(elementsObj.nodes)
  }
}

const VS_TAG = 'cyVisualProperties'
const getBackGround = cx => {
  const color = '#FFFFFF'

  const vps = cx.filter(entry => entry[VS_TAG])
  if (vps !== undefined && vps !== null && vps.length !== 0) {
    const vp = vps[0]
    const allVp = vp[VS_TAG]
    const networkVp = allVp.filter(p => p['properties_of'] === 'network')
    return networkVp[0].properties['NETWORK_BACKGROUND_PAINT']
  } else {
    return color
  }
}

// Utility function to get better results
const adjustLayout = (nodes, queryGenes) => {
  let len = nodes.length

  const upperQuery = new Set(queryGenes.map(gene => gene.toUpperCase()))

  while (len--) {
    const node = nodes[len]

    const name = node.data.name ? node.data.name.toUpperCase() : null
    if (upperQuery.has(name)) {
      node.data['query'] = 'true'
    }
  }
  return nodes
}

const checkLayout = nodes => {
  // Just checks first node only!
  const node = nodes[0]
  if (node.position === undefined) {
    return false
  } else {
    return true
  }
}

const styleUpdater = style => {
  style.push(fadedNode)
  style.push(fadedEdge)
  style.push(highlight)
  style.push(activeObject)
  return style
}

export default network
