import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const MessageSnackbar = props => {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    props.setOpen(false)
  }


  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={props.open}
      autoHideDuration={4000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id="message-id">Genes are copied to clipboard!</span>}
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

export default MessageSnackbar
