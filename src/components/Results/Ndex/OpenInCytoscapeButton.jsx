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

  const [open, setOpen] = useState(false)
  const [loadOpen, setLoadOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [loadMessage, setLoadMessage] = useState('')

  
  const { classes, cyrest, handleImportNetwork } = props

  const disabled = !(props.network.uuid && props.network.uuid.length > 0) || !cyrest.available

  const handleClick = () => {
    setLoadMessage('Opening network in Cytoscape Desktop . . .')
    setLoadOpen(true)
    handleImportNetwork()
  }

  const SnackbarShower = props => {
    useEffect(() => {
      if (props.snackbar != null) {
        setTimeout(() => {
          props.removeSnackbar()
        }, 4000)
      }
    })
    if (props.snackbar === 'SUCCESS') {
      setLoadOpen(false)
      setOpen(true)
      setMessage('Network opened in Cytoscape Desktop!')
    } else if (props.snackbar === 'FAILURE') {
      setLoadOpen(false)
      setOpen(true)
      setMessage('Network failed to open in Cytoscape Desktop :(')  
    } else {
      setOpen(false)
    }
    return null
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
        open={loadOpen} 
        setOpen={setLoadOpen} 
        message={loadMessage} 
        setMessage={setLoadMessage}
        horizontal={'right'}
        vertical={'bottom'}
      />
      <MessageSnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        setMessage={setMessage}
        horizontal={'right'}
        vertical={'bottom'}
      />
      <SnackbarShower snackbar={props.cyrest.snackbar} removeSnackbar={props.cyrestActions.removeSnackbar}/>
    </React.Fragment>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
