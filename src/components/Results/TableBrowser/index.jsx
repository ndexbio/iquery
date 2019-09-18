import React from "react"

import MemoTableBrowserPanel from "./TableBrowserPanel"

const DISABLED_STYLE = {
  width: "100%"
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
  if (
    props.network.originalCX === null ||
    props.search.actualResults.length === 0
  ) {
    return <div style={DISABLED_STYLE} />
  }

  return (
    <div className={"table-browser"}>
      <MemoTableBrowserPanel {...props} />
    </div>
  )
}

const MemoTableBrowser = TableBrowser /*React.memo(TableBrowser, (prevProps, newProps) => {
  return isEqual(prevProps.network.isFetching, newProps.network.isFetching)
})*/

export default MemoTableBrowser
