import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles, withStyles } from '@material-ui/styles'

import { findAttributes } from './attribute-util'

import MemoNetworkProperties from './NetworkProperties'
import NodeProperties from './NodeProperties'
import MemoEdgeProperties from './EdgeProperties'

let update = 0

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

const HoverTab = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'rgb(220,220,220)',
      opacity: 1
    }
  }
}))(props => <Tab {...props} />)

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
    return <MemoEdgeProperties {...props} />
  }
}

const DISABLED_STYLE = {
  width: '100%'
}

const TableBrowserPanel = props => {
  //const network = props.network
  const classes = useStyles()
  let value = props.network.tableDisplayTab
  /*
  if (network === null) {
    return <div style={DISABLED_STYLE} />
  }
*/
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
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.root}
        buttonStyle={{ height: '28px' }}
      >
        <HoverTab
          className={classes.root}
          key={'network-tab'}
          label={'Network'}
          buttonStyle={{ height: '28px' }}
        />
        <HoverTab
          className={classes.root}
          key={'nodes-tab'}
          label={'Nodes'}
          buttonStyle={{ height: '28px' }}
        />
        <HoverTab
          className={classes.root}
          key={'edges-tab'}
          label={'Edges'}
          buttonStyle={{ height: '28px' }}
        />
      </Tabs>
      <TabContent value={value} nodeList={nodeList} {...props} />
    </div>
  )
}

const MemoTableBrowserPanel = TableBrowserPanel /*React.memo(TableBrowserPanel, (prevProps, newProps) => {
  return isEqual(prevProps.network.tableDisplayTab, newProps.network.tableDisplayTab)
})*/

export default MemoTableBrowserPanel
