import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const CytoscapeSnackbar = props => {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    props.setOpen(false)
  }

  const {message} = props;
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={props.open}
      autoHideDuration={4000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={
        <span id="message-id">
          {message}
        </span>
      }
      action={[
        <IconButton
          color="inherit"
          key="close"
          aria-label="Close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  )
}

export default CytoscapeSnackbar
