import React from 'react'
import Button from '@material-ui/core/Button'
import logo from '../../../assets/images/cytoscape-logo.svg'
import logoDisabled from '../../../assets/images/cytoscape-logo-mono.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  buttonIcon: {
    height: '2em'
  },
  button: {
    height: '3em',
    width: '4.3em',
    minWidth: '4.3em'
  }
})

const OpenInCytoscapeButton = props => {
  const { classes, cyrest, handleImportNetwork } = props

  const disabled =
    !(props.network.uuid && props.network.uuid.length > 0) || !cyrest.available

  return (
    <Tooltip
      disableFocusListener
      title="Open this network in Cytoscape Desktop"
      placement="bottom"
    >
      <div>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={disabled}
          onClick={handleImportNetwork}
        >
          <img
            alt="Cytoscape logo"
            src={disabled ? logoDisabled : logo}
            className={classes.buttonIcon}
          />
        </Button>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
