import React from "react"
import Tab from "@material-ui/core/Tab"
import { withStyles } from "@material-ui/core/styles"

const HoverTab = props =>
{
  const {backgroundColor, ...other} = props

  const Hover = withStyles(theme => ({
    root: {
      "&:hover": {
        backgroundColor: props.backgroundColor,
        opacity: 1,
      }
    }
  }))(props => <Tab {...other} />)
  return <Hover {...props}/>
}

export default HoverTab