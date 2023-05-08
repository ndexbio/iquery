import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as ndexSave from '../api/ndexSave'

import {
  SET_NDEX_MODAL_OPEN,
  SET_PROFILE,
  CREDENTIALS_SIGN_ON,
  GOOGLE_SIGN_ON,
  SAVE_TO_NDEX,
  SET_ERROR_MESSAGE,
  SET_NETWORK_URL,
} from '../actions/ndexSave'
import { AUTH_TYPE } from '../authentication'

export default function* ndexSaveSaga() {
  yield takeLatest(GOOGLE_SIGN_ON, watchKeycloakSignOn)
  yield takeLatest(CREDENTIALS_SIGN_ON, watchCredentialsSignOn)
  yield takeLatest(SAVE_TO_NDEX, watchSaveToNDEx)
}

// basic auth token when getting user info or when saving network
// 'Basic ' + window.btoa(user + ':' + pwd)
// Header: const headers = new Headers({
//    Authorization: 'Basic ' + window.btoa(user + ':' + pwd)
//  })

// google auth token when getting user info or when saving network
// 'Bearer <Token>'
// '<Token> is from keycloak.getToken()
// // Header: const headers = new Headers({
//    Authorization: 'Bearer <Token>'
//  })

// call keycloak.updateToken() to refresh token before every request
/**
 * Calling GoogleSignOn
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function* watchKeycloakSignOn(action) {
  const { token } = action.payload
  const headers = new Headers({
    Authorization: token,
  })
  try {
    const res = yield call(ndexSave.ndexValidation, headers)
    const userInfo = yield call([res, 'json'])

    if (res.status === 200) {
      yield put({
        type: SET_PROFILE,
        payload: {
          name: userInfo.firstName,
          image: userInfo.image,
          type: AUTH_TYPE.KEYCLOAK,
        },
      })
    }
  } catch (error) {
    const message = error.response.data.message || 'Failed to verify account. ' + error
    if (message.startsWith('User with email') && message.endsWith("doesn't exist.")) {
      return
    }
  }
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
    Authorization: auth,
  })

  try {
    const resp = yield call(ndexSave.ndexValidation, headers)
    const responseJson = yield call([resp, 'json'])
    if (resp.status != 200) {
      yield put({
        type: SET_ERROR_MESSAGE,
        payload: responseJson.message,
      })
      // there was an authentication error remove any record in local storage
      window.localStorage.removeItem('loggedInUser')
    } else {
      const profile = {
        userName: user,
        name: responseJson.firstName,
        image: responseJson.image,
        type: AUTH_TYPE.BASIC,
        token: pwd,
      }
      // save credentials to local storage
      let loggedInUser = Object.assign({}, profile, {
        firstName: responseJson.firstName,
        lastName: responseJson.lastName,
        externalId: responseJson.externalId,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      yield put({
        type: SET_PROFILE,
        payload: profile,
      })
    }
  } catch (err) {
    console.log(err)
    yield put({
      type: SET_ERROR_MESSAGE,
      payload: 'Unknown error',
    })
    // there was an authentication error remove any record in local storage
    window.localStorage.removeItem('loggedInUser')
  }
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
    Authorization: token,
  })

  const resp = yield call(ndexSave.saveToNDEx, cx, headers)
  console.log('resp', resp)
  console.log('resp.body' + resp.body)

  const responseText = yield call([resp, 'text'])

  let lastSlash = responseText.lastIndexOf('/')
  let networkUUID = responseText.substring(lastSlash + 1)

  const networkURL = 'viewer/networks/' + networkUUID

  console.log('networkURL', networkURL)

  yield put({
    type: SET_NETWORK_URL,
    payload: networkURL,
  })
}
