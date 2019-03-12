import React from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    padding: '1em',
    backgroundColor: '#FAFAFA'
  },
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em'
  }
})

/**
 *
 * Basic property viewer for nodes and edges
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const TableBrowser = props => {
  const { classes } = props
  const network = props.network

  if (network === null) {
    return <div />
  }

  const node = network.selectedNode
  const edge = network.selectedEdge

  console.log('Selected: ', node, edge)

  if (node === null || node === undefined) {
    return <div />
  }

  const keys = Object.keys(node)

  return (
    <div className={classes.container}>
      <Typography variant="h5">
        {'Properties for node: ' + node.name}
      </Typography>
      {keys.map(key => (
        <Typography key={key} variant="h6">
          {key + ': ' + node[key]}
        </Typography>
      ))}
    </div>
  )
}

export default withStyles(styles)(TableBrowser)
