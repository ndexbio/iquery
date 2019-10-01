import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as ndexSave from '../api/ndexSave'

import {
  SET_NDEX_MODAL_OPEN,
  SET_PROFILE,
  CREDENTIALS_SIGN_ON,
  GOOGLE_SIGN_ON,
  SAVE_TO_NDEX,
  SET_ERROR_MESSAGE,
  SET_NETWORK_URL
} from '../actions/ndexSave'

export default function* ndexSaveSaga() {
  yield takeLatest(GOOGLE_SIGN_ON, watchGoogleSignOn)
  yield takeLatest(CREDENTIALS_SIGN_ON, watchCredentialsSignOn)
  yield takeLatest(SAVE_TO_NDEX, watchSaveToNDEx)
}

/**
 * Calling GoogleSignOn
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function* watchGoogleSignOn(action) {
  const resp = action.payload
  const token = resp.tokenObj.token_type + ' ' + resp.tokenObj.id_token
  const profile = {
    name: resp.profileObj.name,
    image: resp.profileObj.imageUrl,
    authorization: {
      type: 'google',
      token
    }
  }

  const headers = new Headers({
    Authorization: profile.authorization.token
  })

  try {
    yield call(ndexSave.ndexValidation, headers)
    yield put({
      type: SET_PROFILE,
      payload: profile
    })
  } catch (error) {
    const message =
      error.response.data.message || 'Failed to verify account. ' + error
    if (
      message.startsWith('User with email') &&
      message.endsWith("doesn't exist.")
    ) {
      /*
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
      */
      //this.props.onError(comp, true)
      return
    }
    //this.props.onError(message, true)
  }
  /*
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
    })*/
}

/**
 * Calling CredentialsSignOn
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function* watchCredentialsSignOn(action) {
  const user = window.basicAuthSignIn.accountName.value
  const pwd = window.basicAuthSignIn.password.value

  const auth = 'Basic ' + window.btoa(user + ':' + pwd)
  const headers = new Headers({
    Authorization: auth
  })

  try {
    const resp = yield call(ndexSave.ndexValidation, headers)
    //console.log('resp', resp)

    const responseJson = yield call([resp, 'json'])

    /*
    console.log('responseJson', responseJson)
    for (const key of resp.headers.keys()) {
      console.log('header ', key)
    }*/

    if (resp.status != 200) {
      yield put({
        type: SET_ERROR_MESSAGE,
        payload: responseJson.message
      })
    } else {
      const profile = {
        name: responseJson.firstName,
        image: responseJson.image,
        authorization: {
          type: 'ndex',
          token: auth
        }
      }
      yield put({
        type: SET_PROFILE,
        payload: profile
      })
    }
    //this.props.onLoginSuccess(profile)
  } catch (err) {
    console.log(err)
    yield put({
      type: SET_ERROR_MESSAGE,
      payload: 'Unknown error'
    })
    //this.setState({ error: 'Unknown error' })
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

/**
 * Calling saveToNDEx
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function* watchSaveToNDEx(action) {
  const token = action.payload.token
  const cx = action.payload.cx

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: token
  })

  const resp = yield call(ndexSave.saveToNDEx, cx, headers)
  console.log('resp', resp)
  console.log('resp.body' + resp.body)

  const responseText = yield call([resp, 'text'])

  const networkURL = responseText.replace('/v2/', '/#/')

  console.log('networkURL', networkURL)

  yield put({
    type: SET_NETWORK_URL,
    payload: networkURL
  })
  /*
  axios
    .post(config.save_to_ndex, cx, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
    .then(resp => {
      const networkUrl = resp.data.replace('/v2/', '/#/')
      this.setState({ networkUrl })
    })
    .catch(err => {
      alert('Failed to save network to NDEx: ' + err)
    })
    */
}
