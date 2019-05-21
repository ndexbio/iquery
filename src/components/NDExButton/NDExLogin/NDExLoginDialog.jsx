import React from 'react'
import { Dialog, Button, Typography, Avatar } from '@material-ui/core'

const NDExLoginDialog = props => (
  <Dialog
    className="sign-in-container"
    open={true}
    onClose={handleClose}
    aria-labelledby="form-dialog-title"
  >
    {profile ? (
      <div className="sign-in-header">
        <Avatar className="ndex-account-avatar" src={profile.image}>
          U
        </Avatar>
        <Typography variant="h4" className="ndex-account-greeting">
          Hi, {profile.name}
        </Typography>
        <Button onClick={onLogout}>Logout</Button>
      </div>
    ) : (
      <NDExSignIn
        handleClose={handleClose}
        onLoginSuccess={onLoginSuccess}
        onLogout={onLogout}
      />
    )}
    {children}
  </Dialog>
)

export default NDExLoginDialog
