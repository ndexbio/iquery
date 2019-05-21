import React, { useState } from 'react'
import { Button, Tooltip, withStyles } from '@material-ui/core'
import logo from '../../assets/images/ndex-logo.svg'

const styles = theme => ({
  button: {
    paddingLeft: '0.5em'
  },
  icon: {
    height: '2.5em'
  }
})

const NDExButton = props => {
  const { classes } = props

  const handleOpen = () => {
    
  }

  return (
    <Tooltip title={'Open this network in NDEx'}>
      <Button className={classes.button} onClick={handleOpen}>
        <img src={logo} alt="Open in NDEx" className={classes.icon} />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(NDExButton)
