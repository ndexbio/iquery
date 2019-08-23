import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import logo from '../../../assets/images/cytoscape-logo.svg'
import logoDisabled from '../../../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import MessageSnackbar from '../../AppShell/MessageSnackbar.jsx'



const BootstrapButton = withStyles({
  root: {
    marginLeft: '0.5em',
    borderColor: '#EA9123',
    '&:active': {
      borderColor: '#EA9123',
    }
  },
})(Button);

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
    !(props.network.uuid && props.network.uuid.length > 0) || 
    !cyrest.available

  const disabledLogo = 0

  const handleClick = () => {
    handleImportNetwork()
  }

  //Snackbar
  const { isLoadingNetwork, lastResponse } = cyrest
  const [open, setOpen] = useState(false)
  const [state, setState] = useState('dormant')
  const [message, setMessage] = useState(null)
  let cycleId = 0

  if (state === 'dormant' && isLoadingNetwork) {
    setMessage('Opening network in Cytoscape Desktop . . .')
    setState('openLoading')
    if (!open) {
      setOpen(true)
    }
  }
  if (
    (state === 'openLoading' || 
    state === 'closeLoading') && 
    lastResponse != null
    ) {
    setState('openResult')
    if (lastResponse.type === 'IMPORT_NETWORK_SUCCEEDED') {
      setMessage('Network opened in Cytoscape Desktop!')
    } else {
      setMessage('Network failed to open in Cytoscape Desktop')
    }
    if (!open) {
      setOpen(true)
    }
  }
  if (state === 'openResult' && !open) {
    setOpen(true)
  }
  if (state === 'openResult' && open) {
    let currentId = cycleId
    setTimeout(() => {
      if (state === 'openResult' && currentId === cycleId) {
        setState('dormant')
        cycleId++
        setOpen(false)
      }
    }, 6000)
  }

  const handleClose = (event, reason) => {
    if (state === 'openLoading') {
      setState('closeLoading')
    } else if (state === 'openResult') {
      setState('dormant')
      cycleId++
    }
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Tooltip
        disableFocusListener
        title="Open this network in Cytoscape Desktop"
        placement="bottom"
      >
        <div>
          <BootstrapButton
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
          </BootstrapButton>
        </div>
      </Tooltip>
      <MessageSnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        setMessage={setMessage}
        autoHideDuration={null}
        horizontal={'right'}
        vertical={'bottom'}
        handleClose={handleClose}
      />
    </React.Fragment>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)