import React from 'react'
import { useState } from "react"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import NetworkProperties from './NetworkProperties'
import NodeProperties from './NodeProperties'
import EdgeProperties from './EdgeProperties'
import { makeStyles } from '@material-ui/styles'


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
  const { value, originalCX, nodes, edges, search  } = props
  if (value === 0) {
    return <NetworkProperties originalCX={originalCX}/>
  } else if (value === 1) {
    return <NodeProperties nodes={nodes} originalCX={originalCX} search={search} {...props} />
  } else {
    return <EdgeProperties edges={edges} originalCX={originalCX} />
  }
}

const DISABLED_STYLE = {
  width: '100%'
}

const TableBrowserPanel = props => {

  const network = props.network
  const classes = useStyles();
  let value = props.network.tableDisplayTab

  if (network === null) {
    return <div style={DISABLED_STYLE} />
  }

  const { originalCX } = network
  if (originalCX === null) {
    return <div style={DISABLED_STYLE} />
  }

  function handleChange(event, newValue) {
    props.networkActions.changeTab(newValue)
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
        originalCX={originalCX} 
        nodes={props.network.selectedNodes}
        edges={props.network.selectedEdges}
        search={props.search}
      />
    </div>
  )
}

export default TableBrowserPanel