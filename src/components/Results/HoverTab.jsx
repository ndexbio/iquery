import React from 'react'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'
import { Tooltip } from '@material-ui/core'

// TODO: use theme
const DEF_BG_COLOR = 'rgb(235, 235, 235)'

const HoverTab = props => {
  const Hover = withStyles(theme => ({
    root: {
      minHeight: props.minheight,
      height: props.height,
      '&:hover': {
        backgroundColor: DEF_BG_COLOR,
        opacity: 1,
      },
    },
  }))(props =>
    props.tooltip ? (
      <Tooltip title={props.tooltip}>
        <Tab {...props} />
      </Tooltip>
    ) : (
      <Tab {...props} />
    ),
  )
  return <Hover {...props} />
}

export default HoverTab
