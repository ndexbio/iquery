import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import HoverTab from '../HoverTab'
import { makeStyles, withStyles } from '@material-ui/styles'

import { findAttributes } from './attribute-util'

import MemoNetworkProperties from './NetworkProperties'
import NodeProperties from './NodeProperties'
import MemoEdgeProperties from './EdgeProperties'

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

const TabContent = props => {
  const { value } = props

  //Find @context
  let context = {}
  let networkAttr = findAttributes(
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

  if (value === 0) {
    return <MemoNetworkProperties {...props} />
  } else if (value === 1) {
    return <NodeProperties context={context} {...props} />
  } else {
    return <MemoEdgeProperties context={context} {...props} />
  }
}

const DISABLED_STYLE = {
  width: '100%'
}

const TableBrowserPanel = props => {
  //const network = props.network
  const classes = useStyles()
  let value = props.network.tableDisplayTab
  const originalCX = props.network.originalCX
  if (originalCX === null) {
    return <div style={DISABLED_STYLE} />
  }

  function handleChange(event, newValue) {
    props.networkActions.changeTab(newValue)
  }

  let nodeList
  for (let i = 0; i < props.network.originalCX.length; i++) {
    if (props.network.originalCX[i].nodes != null) {
      nodeList = props.network.originalCX[i].nodes
      break
    }
  }

  //Get current tab selection
  return (
    <div className="table-browser-panel">
      <Tabs value={value} onChange={handleChange} className={classes.root}>
        <HoverTab
          className={classes.root}
          key={'network-tab'}
          label={'Network'}
        />
        <HoverTab className={classes.root} key={'nodes-tab'} label={'Nodes'} />
        <HoverTab className={classes.root} key={'edges-tab'} label={'Edges'} />
      </Tabs>
      <TabContent value={value} nodeList={nodeList} {...props} />
    </div>
  )
}

export default TableBrowserPanel

