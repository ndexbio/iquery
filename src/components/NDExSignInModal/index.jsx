import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  DialogContent,
  Dialog,
  DialogTitle,
  Button,
  Grid,
  Paper,
  TextField,
  FormControl,
  Typography,
  Avatar
} from '@material-ui/core'
import GoogleLogin from 'react-google-login'

import GoogleLogo from './assets/images/google-logo.svg'
import GoogleLogoDisabled from './assets/images/google-logo-disabled.svg'

import NDExSave from '../NDExSave'

import './style.css'

import config from './assets/config'

const styles = theme => ({})

class GoogleSignOn extends React.Component {
  onFailure = err => {
    const message =
      (err.details &&
        err.details.startsWith(
          'Not a valid origin for the client: http://localhost:'
        )) ||
      (err.error && err['error']) ||
      JSON.stringify(err)
    this.props.onError(message, false)
  }

  render() {
    const { googleSSO, onSuccess } = this.props

    const clsName = googleSSO
      ? 'google-sign-in-button'
      : 'google-sign-in-button googleButtonDisabled'
    const title = googleSSO
      ? 'Sign in with your Google account'
      : "Google Sign In is currently unavailable because the 'BLOCK THIRD-PARTY COOKIES' option is enabled in your web browser." +
        'To use the Google Sign In feature you can do one of two things:' +
        "1. Add 'accounts.google.com' to the list of websites allowed to write / read THIRD - PARTY COOKIES, or" +
        "2. Disable the 'BLOCK THIRD-PARTY COOKIES' option in your browser settings."
    const logo = googleSSO ? GoogleLogo : GoogleLogoDisabled

    return (
      <div className="google-button">
        <GoogleLogin
          clientId={config.googleClientId}
          render={renderProps => (
            <Button
              id="googleSignInButtonId"
              disabled={!googleSSO}
              className={clsName}
              title={title}
              onClick={renderProps.onClick}
            >
              <span className="google-sign-in-button-span">
                <img src={logo} alt="" className="googleLogo" />
                <div className="googleSignInText">Sign in with Google</div>
              </span>
            </Button>
          )}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={this.onFailure}
        />
      </div>
    )
  }
}

class CredentialsSignOn extends React.Component {
  state = {
    error: null
  }

  render() {
    const { error } = this.state
    const { handleCredentialsSignOn } = this.props

    const button_cls = error ? 'btn btn-primary disabled' : 'btn btn-primary'

    return (
      <form name="basicAuthSignIn" onSubmit={handleCredentialsSignOn}>
        <FormControl className="form-control">
          <TextField
            name="accountName"
            type="text"
            placeholder="Account Name"
            required
            title=""
            autoComplete="username"
          />
        </FormControl>
        <FormControl className="form-control">
          <TextField
            name="password"
            type="password"
            placeholder="Password"
            required
            title=""
            autoComplete="password"
          />
        </FormControl>

        <div className="ndex-account-links">
          {/* <div>
                        <a href="/"
                        >Forgot Password?</a>
                    </div> */}
          <div>
            <span>Need an account? </span>
            <a href="http://ndexbio.org">Click here to sign up!</a>
          </div>
        </div>

        {error && (
          <div className="text-danger">
            <br />
            <strong>
              <span
              // style="font-size: 1.1em"
              >
                {error}
              </span>
            </strong>
          </div>
        )}

        <div className="credentials-button-container">
          {this.props.handleClose && (
            <Button
              className="btn btn-default"
              variant="contained"
              onClick={this.props.handleClose}
              type="button"
            >
              Cancel
            </Button>
          )}

          <Button
            className={button_cls}
            variant="contained"
            color="primary"
            type="submit"
          >
            Sign In
          </Button>
        </div>
      </form>
    )
  }
}

export class NDExSignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      googleSSO: true
    }
  }

  onError = (error, googleSSO) => {
    this.setState({ error, googleSSO })
  }

  render() {
    const { googleSSO, error } = this.state

    const {
      handleClose,
      onLoginSuccess,
      onSuccess,
      handleCredentialsSignOn
    } = this.props

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
                      onSuccess={onSuccess}
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
                      handleCredentialsSignOn={handleCredentialsSignOn}
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
}

class NDExSignInModal extends React.Component {
  onLoginSuccess = () => {}

  onLogout = () => {}

  handleClose = () => {
    this.props.ndexSaveActions.setNDExModalOpen(false)
  }

  handleCredentialsSignOn = event => {
    event.preventDefault()
    this.props.ndexSaveActions.credentialsSignOn(event)
  }

  handleOnSuccess = resp => {
    this.props.ndexSaveActions.googleSignOn(resp)
  }

  render() {
    const { classes, ...others } = this.props
    const { ndexSave } = this.props
    const onLogout = this.onLogout
    const onLoginSuccess = this.onLoginSuccess
    const handleClose = this.handleClose
    const handleCredentialsSignOn = this.handleCredentialsSignOn
    const handleOnSuccess = this.handleOnSuccess

    return (
      <div>
        <Dialog
          className="sign-in-container"
          open={ndexSave.ndexModal}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          {ndexSave.profile ? (
            <div className="sign-in-header">
              <Avatar
                className="ndex-account-avatar"
                src={ndexSave.profile.image}
              >
                U
              </Avatar>
              <Typography variant="h4" className="ndex-account-greeting">
                Hi, {ndexSave.profile.name}
              </Typography>
              <Button onClick={onLogout}>Logout</Button>
            </div>
          ) : (
            <NDExSignIn
              handleClose={handleClose}
              onLoginSuccess={onLoginSuccess}
              onLogout={onLogout}
              handleCredentialsSignOn={handleCredentialsSignOn}
              onSuccess={handleOnSuccess}
            />
          )}
          <NDExSave {...others} />
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(NDExSignInModal)
