import React from 'react'
import { Typography } from '@material-ui/core'

/**
 * Dummy table browser
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const TableBrowser = props => {
  const network = props.network

  if (network === null) {
    return <div />
  }

  const node = network.selectedNode
  if (node === null || node === undefined) {
    return <div />
  }


  return (
    <div>
      <Typography variant="h6">{node.name}</Typography>
    </div>
  )
}

export default TableBrowser
