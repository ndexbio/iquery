import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import logo from '../../../assets/images/cytoscape-logo.svg'
import logoDisabled from '../../../assets/images/cytoscape-logo-mono.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import CytoscapeSnackbar from './CytoscapeSnackbar'

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

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('Network has been opened in Cytoscape Desktop!')

  const { classes, cyrest, handleImportNetwork } = props

  const disabled = !(props.network.uuid && props.network.uuid.length > 0) || !cyrest.available

  const handleImportNetworkPromise = function() {
    return new Promise(function(resolve, reject) {
      if (cyrest.lastResponse.type === 'IMPORT_NETWORK_SUCCESS') {
        resolve();
      } else {
        reject();
      }
    })
  }

  const handleClick = () => {
    handleImportNetworkPromise().then(
      function(result) {
        setOpen(open)
      },
      function(error) {
        setMessage("Network failed to open in Cytoscape Desktop")
        setOpen(open)
      }
    )
  }

/*
  const handleClick = () => {
    handleImportNetwork()
    if (cyrest.lastResponse == null) {
      setMessage("null")
    }
    else if (cyrest.lastResponse.type === 'IMPORT_NETWORK_FAILED') {
      setMessage("Network failed to open in Cytoscape Desktop")
    }
    setOpen(true)
  }
*/

  return (
    <React.Fragment>
      <CytoscapeSnackbar open={open} setOpen={setOpen} message={message} setMessage={setMessage}/>
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
    </React.Fragment>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
