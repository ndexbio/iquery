import React from "react"
import "./style.css"

import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"

const NetworkSearch = props => {
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
      />
    </div>
  )
}

export default NetworkSearch
