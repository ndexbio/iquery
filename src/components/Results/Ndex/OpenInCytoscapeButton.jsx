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

const OpenInCytoscapeButton = (props) => {
  const { classes, cyrest, handleImportNetwork } = props

  return (
    <Button
      variant="contained"
      color="default"
      disabled={!(props.network.uuid && props.network.uuid.length > 0) || !cyrest.available}
      onClick={handleImportNetwork}
    >
      Open In
      <img alt="Cytoscape logo" src={logo} className={classes.buttonIcon} />
    </Button>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
