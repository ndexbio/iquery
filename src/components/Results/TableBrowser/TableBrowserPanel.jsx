import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/styles'

import NetworkProperties from './NetworkProperties'
import NodeProperties from './NodeProperties'
import EdgeProperties from './EdgeProperties'



const useStyles = makeStyles(theme => ({
  container: {
    padding: '0.2em',
    backgroundColor: '#FFFFFF',
    overflow: 'auto'
  },
  list: {

  },
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em'
  },
  root: {
    minHeight: 0,
  }
}))

const TabContent = props => {
  const { value } = props
  if (value === 0) {
    return (
      <NetworkProperties {...props}/>
    )
  } else if (value === 1) {
    return (
      <NodeProperties {...props}/>
    )
  } else {
    return (
      <EdgeProperties {...props} />
    )
  }
}

const DISABLED_STYLE = {
  width: '100%'
}

const TableBrowserPanel = props => {

  //const network = props.network
  const classes = useStyles();
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
        buttonStyle={{height: '28px'}}
      >
        <Tab 
          className={classes.root}
          key={"network-tab"}
          label={"Network"}
          buttonStyle={{height: '28px'}}
        />
        <Tab
          className={classes.root}
          key={"nodes-tab"}
          label={"Nodes"}
          buttonStyle={{height: '28px'}}
        />
        <Tab
          className={classes.root}
          key={'edges-tab'}
          label={"Edges"}
          buttonStyle={{height: '28px'}}
        />
      </Tabs>
      <TabContent 
        value={value} 
        nodeList={nodeList} 
        {...props}
      />
    </div>
  )
}

export default (TableBrowserPanel)