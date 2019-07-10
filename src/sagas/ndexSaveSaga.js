import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as cyrest from '../api/cyrest'

import {
  SET_NDEX_MODAL_OPEN,
  SET_PROFILE,
  CREDENTIALS_SIGN_ON,
  GOOGLE_SIGN_ON
} from '../actions/ndexSave'

export default function* ndexSaveSaga() {
  yield takeLatest(GOOGLE_SIGN_ON, watchGoogleSignOn)
  yield takeLatest(CREDENTIALS_SIGN_ON, watchCredentialsSignOn)
}

/**
 * Calling GoogleSignOn
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function* watchGoogleSignOn(action) {}

/**
 * Calling CredentialsSignOn
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function* watchCredentialsSignOn(action) {
  console.log('Credentials sign-on')
  const user = window.basicAuthSignIn.accountName.value
  const pwd = window.basicAuthSignIn.password.value

  const auth = 'Basic ' + window.btoa(user + ':' + pwd)
  const headers = {
    headers: {
      Authorization: auth
    }
  }
  /*
    axios
      .get(config.NDEX_USER_VALIDATION, headers)
      .then(resp => {
        const profile = {
          name: resp.data.firstName,
          image: resp.data.image,
          authorization: {
            type: 'ndex',
            token: resp.config.headers['Authorization']
          }
        }
        this.props.onLoginSuccess(profile)
      })
      .catch(err => {
        console.log(err)
        if ('response' in err) {
          this.setState({ error: err.response.data.message })
        } else {
          this.setState({ error: 'Unknown error' })
        }
      })*/
}
