import React from "react"
import Tabs from "@material-ui/core/Tabs"
import HoverTab from "../HoverTab"
import { makeStyles, withStyles } from "@material-ui/styles"

import { findAttributes } from "./attribute-util"

import MemoNetworkProperties from "./NetworkProperties"
import NodeProperties from "./NodeProperties"
import MemoEdgeProperties from "./EdgeProperties"

const useStyles = makeStyles(theme => ({
  container: {
    padding: "0.2em",
    backgroundColor: "#FFFFFF",
    overflow: "auto"
  },
  list: {},
  subtitle: {
    marginLeft: "1em",
    marginTop: "0.5em"
  },
  root: {
    minHeight: 0
  }
}))

const backgroundColor = "rgb(220, 220, 220)"

const TabContent = props => {
  const { value } = props

  //Find @context
  let context = {}
  let networkAttr = findAttributes(
    props.network.originalCX,
    "networkAttributes"
  )
  if (networkAttr != null) {
    for (let i = 0; i < networkAttr.length; i++) {
      if (networkAttr[i].n === "@context") {
        context = JSON.parse(networkAttr[i].v)
      }
    }
  }

  //Find nodelist
  let nodeList
  for (let i = 0; i < props.network.originalCX.length; i++) {
    if (props.network.originalCX[i].nodes != null) {
      nodeList = props.network.originalCX[i].nodes
      break
    }
  }

  //Find represents
  const represents = {}
  if (nodeList != null) {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].r != null) {
        represents[nodeList[i].n] = nodeList[i].r
      }
    }
  }



  if (value === 0) {
    return <MemoNetworkProperties {...props} />
  } else if (value === 1) {
    return <NodeProperties context={context} represents={represents} {...props} />
  } else {
    return <MemoEdgeProperties context={context} nodeList={nodeList} {...props} />
  }
}

const DISABLED_STYLE = {
  width: "100%"
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

  //Get current tab selection
  return (
    <div className="table-browser-panel">
      <Tabs value={value} onChange={handleChange} className={classes.root}>
        <HoverTab
          className={classes.root}
          key={"network-tab"}
          label={"Network"}
          backgroundColor={backgroundColor}
        />
        <HoverTab className={classes.root} key={"nodes-tab"} label={"Nodes"} backgroundColor={backgroundColor}/>
        <HoverTab className={classes.root} key={"edges-tab"} label={"Edges"} backgroundColor={backgroundColor}/>
      </Tabs>
      <TabContent value={value} {...props} />
    </div>
  )
}

export default TableBrowserPanel

