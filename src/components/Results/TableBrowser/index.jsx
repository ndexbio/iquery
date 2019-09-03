import React from 'react'
import {isEqual} from 'lodash'
import { makeStyles } from '@material-ui/styles'

import MemoTableBrowserPanel from './TableBrowserPanel'

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
  

  if (props.network.originalCX === null) {
    return <div style={DISABLED_STYLE} />
  }

  return (
    <div className={'table-browser'}>
      <MemoTableBrowserPanel {...props} />
    </div>
  ) 
}

const MemoTableBrowser = TableBrowser /*React.memo(TableBrowser, (prevProps, newProps) => {
  return isEqual(prevProps.network.isFetching, newProps.network.isFetching)
})*/

export default (MemoTableBrowser)
