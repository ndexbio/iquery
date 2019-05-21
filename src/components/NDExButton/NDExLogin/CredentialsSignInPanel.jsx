import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const NDEX_USER_VALIDATION = 'http://ndexbio.org/v2/user?valid=true'

const CredentialsSignInPanel = props => {
  const { loginSuccessHandler, closeHandler } = props
  const [error, setError] = useState(null)

  const submit = event => {
    event.preventDefault()
    const user = window.basicAuthSignIn.accountName.value
    const pwd = window.basicAuthSignIn.password.value

    const auth = 'Basic ' + window.btoa(user + ':' + pwd)

    const config = {
      method: 'GET',
      headers: {
        Authorization: auth
      }
    }

    fetch(NDEX_USER_VALIDATION, config)
      .then(resp => {
        const profile = {
          name: resp.data.firstName,
          image: resp.data.image,
          authorization: {
            type: 'ndex',
            token: resp.config.headers['Authorization']
          }
        }
        loginSuccessHandler(profile)
      })
      .catch(err => {
        console.error(err)

        if ('response' in err) {
          setError(err.response.data.message)
        } else {
          setError('Unknown error')
        }
      })
  }

  const button_cls = error ? 'btn btn-primary disabled' : 'btn btn-primary'

  return (
    <form name="basicAuthSignIn" onSubmit={submit}>
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
        <div>
          <span>Need an account? </span>
          <a href="http://ndexbio.org">Click here to sign up!</a>
        </div>
      </div>

      {error && (
        <div className="text-danger">
          <br />
          <strong>
            <span>{error}</span>
          </strong>
        </div>
      )}

      <div className="credentials-button-container">
        {closeHandler && (
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
