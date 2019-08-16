import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import List from '@material-ui/core/List'
import NodeProperties from './NodeProperties'
import EdgeProperties from './EdgeProperties'
import NetworkProperties from './NetworkProperties'
import NetworkProperties2 from './NetworkProperties2'
import Split from 'react-split'


const useStyles = makeStyles(theme => ({
  container: {
    padding: '0.2em',
    backgroundColor: '#FFFFFF',
    overflow: 'auto'
  },
  list: {
    width: '100%'
  },
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em'
  }
}))

const DISABLED_STYLE = {
  width: '100%'
}
/**
 *
 * Basic property viewer for nodes and edges
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const TableBrowser = props => {
  const classes = useStyles()
  const network = props.network

  if (network === null) {
    return <div style={DISABLED_STYLE} />
  }

  const { originalCX } = network
  if (originalCX === null) {
    return <div style={DISABLED_STYLE} />
  }

  const node = network.selectedNode
  const edge = network.selectedEdge

  if (!node && !edge) {
    return (
      <div className={'table-browser'}>
        <NetworkProperties2 originalCX={originalCX}/>
      </div>
    )
  }

  return (
    <div className={"table-browser"}>
      <List component="nav" className={classes.list}>
        {node !== null ? (
          <NodeProperties node={node} originalCX={originalCX} {...props} />
        ) : (
          <EdgeProperties edge={edge} />
        )}
      </List>
    </div>
  )
}

export default TableBrowser
