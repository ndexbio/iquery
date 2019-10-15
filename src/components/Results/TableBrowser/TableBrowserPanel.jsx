import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import HoverTab from '../HoverTab'
import { makeStyles } from '@material-ui/styles'

import { findAttributes } from './attribute-util'

import NetworkProperties from './NetworkProperties'
import MemoNodeProperties from './NodeProperties'
import MemoEdgeProperties from './EdgeProperties'

import { mapKeys } from 'lodash'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0.2em',
    backgroundColor: '#FFFFFF',
    overflow: 'auto'
  },
  list: {},
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em'
  },
  root: {
    minHeight: 0
  }
}))

const backgroundcolor = 'rgb(220, 220, 220)'

const TabContent = props => {
  const { value } = props

  //Find @context
  let context = {}
  const networkAttr = findAttributes(
    props.network.originalCX,
    'networkAttributes'
  )
  if (networkAttr != null) {
    for (let i = 0; i < networkAttr.length; i++) {
      if (networkAttr[i].n === '@context') {
        context = JSON.parse(networkAttr[i].v)
      }
    }
  }
  //Uppercase all keys in context
  context = mapKeys(context, function(v, k) {
    return k.toUpperCase()
  })

  //Find nodelist and nodeAttributes
  let nodeList
  let nodeAttributes
  for (let i = 0; i < props.network.originalCX.length; i++) {
    if (props.network.originalCX[i].nodes != null) {
      nodeList = props.network.originalCX[i].nodes
      if (nodeAttributes != undefined) {
        break
      }
    }
    if (props.network.originalCX[i].nodeAttributes != null) {
      nodeAttributes = props.network.originalCX[i].nodeAttributes
      if (nodeList != undefined) {
        break
      }
    }
  }

  const represents = {}
  const aliasList = {}
  if (nodeList != null) {
    //Find represents
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].r != null) {
        represents[nodeList[i].n] = nodeList[i].r
      }
    }
    //Find aliasList
    if (nodeAttributes != null) {
      for (let i = 0; i < nodeAttributes.length; i++) {
        if (
          (nodeAttributes[i].n =
            'alias' && nodeAttributes[i].d === 'list_of_string')
        ) {
          const geneName = nodeList.filter(
            node => node['@id'] === nodeAttributes[i].po
          )[0].n
          if (geneName != null) {
            if (aliasList[geneName] == null) {
              aliasList[geneName] = nodeAttributes[i].v
            } else {
              aliasList[geneName] = aliasList[geneName].concat(
                nodeAttributes[i].v
              )
            }
          }
        }
      }
    }
  }

  if (value === 0) {
    return <NetworkProperties context={context} {...props} />
  } else if (value === 1) {
    return (
      <MemoNodeProperties
        context={context}
        represents={represents}
        aliasList={aliasList}
        {...props}
      />
    )
  } else {
    return (
      <MemoEdgeProperties context={context} nodeList={nodeList} {...props} />
    )
  }
}

const DISABLED_STYLE = {
  width: '100%'
}

const TableBrowserPanel = props => {
  //const network = props.network
  const classes = useStyles()
  const value = props.network.tableDisplayTab
  const originalCX = props.network.originalCX
  if (originalCX === null) {
    return <div style={DISABLED_STYLE} />
  }

  function handleChange(event, newValue) {
    props.networkActions.changeTab(newValue)
  }

  //Get current tab selection
  return (
    <div className="table-browser-panel">
      <Tabs value={value} onChange={handleChange} className={classes.root}>
        <HoverTab
          className={classes.root}
          key={'network-tab'}
          label={'Network'}
          backgroundcolor={backgroundcolor}
        />
        <HoverTab
          className={classes.root}
          key={'nodes-tab'}
          label={'Nodes'}
          backgroundcolor={backgroundcolor}
        />
        <HoverTab
          className={classes.root}
          key={'edges-tab'}
          label={'Edges'}
          backgroundcolor={backgroundcolor}
        />
      </Tabs>
      <TabContent value={value} {...props} />
    </div>
  )
}

export default TableBrowserPanel
