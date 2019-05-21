import React from 'react'
import './style.css'

import Button from '@material-ui/core/Button'
import logo from '../../../assets/images/cytoscape-logo.svg'
import { Tooltip, withStyles } from '@material-ui/core'

const styles = theme => ({
  button: {
    paddingLeft: '0.5em'
  },
  icon: {
    height: '2.5em'
  }
})

const OpenInButton = props => {
  const { classes, cyrest, handleImportNetwork } = props

  return (
    <Tooltip title={'Open in Cytoscape'}>
      <Button
        className={classes.button}
        variant="contained"
        color="default"
        disabled={!cyrest.available}
        onClick={handleImportNetwork}
      >
        <img alt="Cytoscape logo" src={logo} className={classes.icon} />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInButton)
