import React from 'react'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'


const HoverTab = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'rgb(235,235,235)',
      opacity: 1,
      color: '#222222'
    }
  }
}))(props => <Tab {...props} />)


export default HoverTab