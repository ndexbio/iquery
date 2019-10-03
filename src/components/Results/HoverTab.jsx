import React from 'react'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'

const HoverTab = props => {
  //const { backgroundColor, ...other } = props

  const Hover = withStyles(theme => ({
    root: {
      '&:hover': {
        backgroundColor: props.backgroundcolor,
        opacity: 1
      }
    }
  }))(props => <Tab {...props} />)
  return <Hover {...props} />
}

export default HoverTab
