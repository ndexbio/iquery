import React from 'react'
import Draggable from 'react-draggable'
import DialogContentText from '@material-ui/core/DialogContentText'

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
  Avatar,
} from '@material-ui/core'

import GoogleLogo from './assets/images/google-logo.svg'
import GoogleLogoDisabled from './assets/images/google-logo-disabled.svg'

import NDExSave from '../NDExSave'

import './style.css'
import { AUTH_TYPE, isAuthenticated, logoutUserProfile } from '../../authentication'

const PaperComponent = (props) => {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

class GoogleSignOn extends React.Component {
  onFailure = (err) => {
    const message =
      (err.details && err.details.startsWith('Not a valid origin for the client: http://localhost:')) ||
      (err.error && err['error']) ||
      JSON.stringify(err)
    this.props.onError(message, false)
  }

  render() {
    const { googleSSO, onSuccess } = this.props

    const clsName = googleSSO ? 'google-sign-in-button' : 'google-sign-in-button googleButtonDisabled'
    const title = googleSSO
      ? 'Sign in with your Google account'
      : "Google Sign In is currently unavailable because the 'BLOCK THIRD-PARTY COOKIES' option is enabled in your web browser." +
        'To use the Google Sign In feature you can do one of two things:' +
        "1. Add 'accounts.google.com' to the list of websites allowed to write / read THIRD - PARTY COOKIES, or" +
        "2. Disable the 'BLOCK THIRD-PARTY COOKIES' option in your browser settings."
    const logo = googleSSO ? GoogleLogo : GoogleLogoDisabled

    return (
      <div className="google-button">
        <Button
          id="googleSignInButtonId"
          disabled={!googleSSO}
          className={clsName}
          title={title}
          onClick={() => {
            if (this.props.ndexSave.keycloak != null) {
              this.props.ndexSave.keycloak.login().then((res) => {})
            }
          }}
        >
          <span className="google-sign-in-button-span">
            <img src={logo} alt="" className="googleLogo" />
            <div className="googleSignInText">Sign in with Google</div>
          </span>
        </Button>
      </div>
    )
  }
}

class CredentialsSignOn extends React.Component {
  render() {
    const { error, handleCredentialsSignOn } = this.props

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
          <TextField name="password" type="password" placeholder="Password" required title="" autoComplete="password" />
        </FormControl>

        <div className="ndex-account-links">
          {/* <div>
                        <a href="/"
                        >Forgot Password?</a>
                    </div> */}
          <div>
            <span>Need an account? </span>
            <a href="/" target="_blank" rel="noopener noreferrer">
              Click here to sign up!
            </a>
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
              style={{ margin: '1em' }}
            >
              Cancel
            </Button>
          )}

          <Button className={button_cls} variant="contained" color="primary" type="submit">
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
      googleSSO: true,
    }
  }

  onError = (error, googleSSO) => {
    this.props.handleError(error)
    this.setState({ googleSSO })
  }

  render() {
    const { googleSSO } = this.state

    const { handleClose, onLoginSuccess, onSuccess, handleCredentialsSignOn, handleError, error } = this.props

    return (
      <div>
        <DialogTitle id="form-dialog-title">Sign in to your NDEx Account</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <div className="NDExSignInContainer">
              <Grid container spacing={5}>
                <Grid item xs={6} className="grid">
                  <Paper className="grid-paper">
                    <div className="grid-content">
                      <GoogleSignOn
                        onError={this.onError}
                        googleSSO={googleSSO}
                        onLoginSuccess={onLoginSuccess}
                        onSuccess={onSuccess}
                        {...this.props}
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
                        handleError={handleError}
                        error={error}
                      />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>

          {/*error && (
            <div className="sign-in-error">
              <p>{error}</p>
            </div>
          )*/}
        </DialogContent>
      </div>
    )
  }
}

class SaveNDExNetworkDialog extends React.Component {
  onLoginSuccess = () => {}

  onLogout = () => {
    if (isAuthenticated(this.props.ndexSave.profile)) {
      window.localStorage.removeItem('loggedInUser')

      if (this.props.ndexSave.profile.type === AUTH_TYPE.KEYCLOAK) {
        this.props.ndexSaveActions.setProfile(logoutUserProfile())

        this.props.ndexSave.keycloak.logout()
      } else {
        this.props.ndexSaveActions.setProfile(logoutUserProfile())
      }
    }
  }

  handleClose = () => {
    this.props.ndexSaveActions.setNDExModalOpen(false)
  }

  handleCredentialsSignOn = (event) => {
    event.preventDefault()
    this.props.ndexSaveActions.credentialsSignOn(event)
  }

  handleOnSuccess = (resp) => {
    this.props.ndexSaveActions.googleSignOn(resp)
  }

  handleError = (error) => {
    this.props.ndexSaveActions.setErrorMessage(error)
  }

  render() {
    const { ...props } = this.props
    const onLogout = this.onLogout
    const onLoginSuccess = this.onLoginSuccess
    const handleClose = this.handleClose
    const handleCredentialsSignOn = this.handleCredentialsSignOn
    const handleOnSuccess = this.handleOnSuccess
    const handleError = this.handleError

    const profileContent = (
      <div className="sign-in-header">
        <Avatar className="ndex-account-avatar" src={this.props.ndexSave?.profile?.image ?? ''}>
          U
        </Avatar>
        <Typography variant="h4" className="ndex-account-greeting">
          Hi, {this.props.ndexSave?.profile?.name ?? ''}
        </Typography>
        <Button onClick={onLogout}>Logout</Button>
      </div>
    )

    const signInContent = (
      <NDExSignIn
        handleClose={handleClose}
        onLoginSuccess={onLoginSuccess}
        onLogout={onLogout}
        handleCredentialsSignOn={handleCredentialsSignOn}
        onSuccess={handleOnSuccess}
        handleError={handleError}
        error={this.props.ndexSave.errorMessage}
        {...this.props}
      />
    )

    return (
      <div>
        <Dialog
          className="sign-in-container"
          open={this.props.ndexSave.ndexModal}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          PaperComponent={PaperComponent}
          scroll="body"
        >
          {isAuthenticated(this.props.ndexSave.profile) ? profileContent : signInContent}
          {isAuthenticated(this.props.ndexSave.profile) ? <NDExSave {...props} /> : null}
        </Dialog>
      </div>
    )
  }
}

export default SaveNDExNetworkDialog
