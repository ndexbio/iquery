import React from 'react'
import './style.css'

import Button from '@material-ui/core/Button'
import logo from '../../../assets/images/cytoscape-logo.svg'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  buttonIcon: {
    height: '2.5em',
    paddingLeft: '0.5em'
  }
})

const OpenInButton = (props) => {
  const { classes, cyrest, network, handleImportNetwork } = props

  return (
    <Button
      variant="contained"
      color="default"
      disabled={!network.originalCX || !cyrest.available}
      onClick={handleImportNetwork}
    >
      Open in
      <img alt="Cytoscape logo" src={logo} className={classes.buttonIcon} />
    </Button>
  )
}

export default withStyles(styles)(OpenInButton)
