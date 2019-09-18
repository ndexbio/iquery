import React from "react"

import Ndex from "./Ndex"
import LoadingPanel from "../LoadingPanel"

import { isEqual } from "lodash"

const TabContent = props => {
  const results = props.results

  if (results === null || results === undefined ) {
    return (
      <LoadingPanel
        title={"Loading results"}
        message={<div style={{ color: "black" }}>Please wait...</div>}
      />
    )
  } else {
    return (
      <Ndex hits={results.results} sourceUUID={results.sourceUUID} {...props} />
    )
  }
}

export default TabContent
