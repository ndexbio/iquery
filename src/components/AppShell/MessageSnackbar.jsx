import React, {useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const MessageSnackbar = props => {

  const [isOpen, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    props.setOpen(false)
  }
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: props.vertical,
        horizontal: props.horizontal
      }}
      open={props.open}
      autoHideDuration={props.autoHideDuration || null}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id="message-id">{props.message}</span>}
      action={[
        <IconButton
          color="inherit"
          key="close"
          aria-label="Close"
          onClick={props.handleClose || handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  )
}

export default MessageSnackbar
