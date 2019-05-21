import React from 'react'
import GoogleLogin from 'react-google-login'

import GoogleLogo from '../../../assets/images/google-logo.svg'
import GoogleLogoDisabled from '../../../assets/images/google-logo-disabled.svg'

const GoogleSignInPanel = props => {
  const { googleSSO, errorHandler } = props

  const onFailure = err => {
    const message =
      (err.details &&
        err.details.startsWith(
          'Not a valid origin for the client: http://localhost:'
        )) ||
      (err.error && err['error']) ||
      JSON.stringify(err)
    errorHandler(message, false)
  }

  const verify = profile => {
    axios
      .get(config.NDEX_USER_VALIDATION, {
        headers: {
          Authorization: profile.authorization.token
        }
      })
      .then(_ => {
        this.props.onLoginSuccess(profile)
      })
      .catch(error => {
        const message =
          error.response.data.message || 'Failed to verify account. ' + error
        if (
          message.startsWith('User with email') &&
          message.endsWith("doesn't exist.")
        ) {
          const comp = (
            <span>
              {message} Go to{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://ndexbio.org"
              >
                http://ndexbio.org
              </a>{' '}
              to create an account
            </span>
          )
          this.props.onError(comp, true)
          return
        }
        this.props.onError(message, true)
      })
  }

  const onSuccess = resp => {
    const token = resp.tokenObj.token_type + ' ' + resp.tokenObj.id_token
    const profile = {
      name: resp.profileObj.name,
      image: resp.profileObj.imageUrl,
      authorization: {
        type: 'google',
        token
      }
    }
    this.verify(profile)
  }

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
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}
      />
    </div>
  )
}

export default GoogleSignInPanel
