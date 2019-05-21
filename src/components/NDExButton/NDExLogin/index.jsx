import Dialog from '@material-ui/core/Dialog'

const NDExLogin = props => {
  const {
    profile,
    handleClose,
    onLoginSuccess,
    onLogout,
    children
  } = this.props

  return (
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
}
