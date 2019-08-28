import React, {useState} from 'react'
import { Typography } from '@material-ui/core'
import cytoLogo from '../../../assets/images/cytoscape-logo.svg'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import MessageSnackbar from '../../AppShell/MessageSnackbar.jsx'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import './style.css'
import { resetWarningCache } from 'prop-types';

const styles = theme => ({
  logo: {

  },
  button: {
    height: '50%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    top: '15%'
  },
  outer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
    position: 'relative',
    marginTop: '15%',
    width: '100%'
  }
})

const Warning = props => {
  const { classes } = props

  //Snackbar
  const isLoadingNetwork = props.cyrest_isLoadingNetwork
  const lastResponse = props.cyrest_lastResponse

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

  const handleClick = () => {
    props.handleImportNetwork()
  }

  if (props.network_uuid && props.network_uuid.length > 0 && props.cyrest_available) {
    return (
      <React.Fragment>
        <Tooltip title="Open in cytoscape" placement="bottom">
          <IconButton className={classes.button}
            aria-haspopup="true"
            color="default"
            onClick={handleClick}
          >
            <img alt="Cytoscape logo" src={cytoLogo} className={classes.logo} />
            <Typography variant="subtitle2" color='textSecondary'>
              Network is too big for interactive view. <br/>
              Click to open in Cytoscape Desktop.
            </Typography>
          </IconButton>
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
  } else {
    return (
      <div className={classes.outer}>
        <div className={classes.inner}>
        <Typography variant="subtitle2" color='textSecondary' align='center'>
            Network is too big for interactive view, <br/>
            but may be viewed in Cytoscape Desktop
            </Typography>
            </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    network_uuid: state.network.uuid,
    cyrest_available: state.cyrest.available
  }
}

export default connect(
  mapStateToProps
)(withStyles(styles)(Warning))
