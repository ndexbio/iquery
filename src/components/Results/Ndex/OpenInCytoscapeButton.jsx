import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import logo from '../../../assets/images/cytoscape-logo.svg'
import logoDisabled from '../../../assets/images/cytoscape-logo-mono.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import MessageSnackbar from '../../AppShell/MessageSnackbar.jsx'

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
  useEffect(() => {
    props.cyrestActions.startCyRestPolling()
    return () => {
      props.cyrestActions.stopCyRestPolling()
    }
  }, [])

  const { classes, cyrest, handleImportNetwork } = props

  const disabled =
    !(props.network.uuid && props.network.uuid.length > 0) || !cyrest.available

  const handleClick = () => {
    handleImportNetwork()
  }

  // Setup state for the Snackbar
  const { isLoadingNetwork, lastResponse } = cyrest


  let statusMessage = '?'
  let openSnackbar = false
  if (isLoadingNetwork) {
    console.log('=================== Start Loading:', isLoadingNetwork, lastResponse)
    openSnackbar = true
    statusMessage = 'Opening network in Cytoscape Desktop'
  } else if (
    lastResponse !== null &&
    lastResponse.type === 'IMPORT_NETWORK_SUCCEEDED'
  ) {
    console.log('=================== Success!:')
    openSnackbar = true
    statusMessage = 'Network opened in Cytoscape Desktop!'
  } else if (
    lastResponse !== null &&
    lastResponse.type === 'IMPORT_NETWORK_FAILED'
  ) {
    openSnackbar = true
    statusMessage = 'Network failed to open in Cytoscape Desktop'
  }

  return (
    <React.Fragment>
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
            onClick={handleClick}
          >
            <img
              alt="Cytoscape logo"
              src={disabled ? logoDisabled : logo}
              className={classes.buttonIcon}
            />
          </Button>
        </div>
      </Tooltip>
      <MessageSnackbar
        open={openSnackbar}
        message={statusMessage}
        autoHideDuration={6000}
        horizontal={'right'}
        vertical={'bottom'}
      />
    </React.Fragment>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
