import React from "react"
import Tab from "@material-ui/core/Tab"
import { withStyles } from "@material-ui/core/styles"

const HoverTab = props =>
{
  const Hover = withStyles(theme => ({
    root: {
      "&:hover": {
        backgroundColor: props.backgroundColor,
        opacity: 1,
      }
    }
  }))(props => <Tab {...props} />)
  return <Hover {...props}/>
}

export default HoverTab