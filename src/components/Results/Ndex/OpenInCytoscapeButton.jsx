import React from 'react'
import Button from '@material-ui/core/Button'
import logo from '../../../assets/images/cytoscape-logo.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  buttonIcon: {
    height: '2em'
  },
  button: {
    minWidth: '5em'
  }
})

const OpenInCytoscapeButton = props => {
  const { classes, cyrest, handleImportNetwork } = props

  return (
    <Tooltip
      disableFocusListener
      title="Open this network in Cytoscape Desktop"
      placement="bottom"
    >
      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="default"
          disabled={
            !(props.network.uuid && props.network.uuid.length > 0) ||
            !cyrest.available
          }
          onClick={handleImportNetwork}
        >
          <img alt="Cytoscape logo" src={logo} className={classes.buttonIcon} />
        </Button>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
