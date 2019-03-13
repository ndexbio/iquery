import React, { useRef } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import List from '@material-ui/core/List'
import NodeProperties from './NodeProperties'
import EdgeProperties from './EdgeProperties'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    padding: '0.2em',
    backgroundColor: '#FFFFFF',
    overflow: 'auto'
  },
  list: {
    height: '100%',
    width: '100%'
  },
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em'
  }
}))

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
    return <div />
  }

  const node = network.selectedNode
  const edge = network.selectedEdge

  console.log('Selected: ', node, edge)

  if (!node && !edge) {
    return (
      <div className={classes.container}>
        <Typography variant="h6">
          (Select a node/edge to show the details)
        </Typography>
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <List component="nav" className={classes.list}>
        {node !== null ? (
          <NodeProperties node={node} {...props} />
        ) : (
          <EdgeProperties edge={edge} />
        )}
      </List>
    </div>
  )
}

export default TableBrowser
