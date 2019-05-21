import React from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";

const NDExSignInPanel = props => {
  const onError = (error, googleSSO) => {
    this.setState({ error, googleSSO })
  }

  const { googleSSO, error } = this.state

  const { handleClose, onLoginSuccess } = props

  return (
    <div>
      <DialogTitle id="form-dialog-title">
        Sign in to your NDEx Account
      </DialogTitle>
      <DialogContent>
        <div className="NDExSignInContainer">
          <Grid container spacing={8}>
            <Grid item xs={6} className="grid">
              <Paper className="grid-paper">
                <div className="grid-content">
                  <GoogleSignOn
                    onError={this.onError}
                    googleSSO={googleSSO}
                    onLoginSuccess={onLoginSuccess}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} className="grid">
              <Paper className="grid-paper">
                <div className="grid-content">
                  <CredentialsSignOn
                    onLoginSuccess={onLoginSuccess}
                    handleClose={handleClose}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        {error && (
          <div className="sign-in-error">
            <p>{error}</p>
          </div>
        )}
      </DialogContent>
    </div>
  )
}
