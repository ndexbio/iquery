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
    const resp = yield call(ndexSave.ndexValidation, headers)
    const responseJson = yield call([resp, 'json'])
    // get first name of user from NDEx
    if (resp.status == 200){
      profile.name = responseJson.firstName;
      profile.image = responseJson.image;
    }
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
    Authorization: auth
  })

  try {
    const resp = yield call(ndexSave.ndexValidation, headers)
    const responseJson = yield call([resp, 'json'])
    if (resp.status != 200) {
      yield put({
        type: SET_ERROR_MESSAGE,
        payload: responseJson.message
      })
      // there was an authentication error remove any record in local storage
      window.localStorage.removeItem('loggedInUser');
    } else {
      const profile = {
        name: responseJson.firstName,
        image: responseJson.image,
        authorization: {
          type: 'ndex',
          token: auth
        }
      }
      // save credentials to local storage
      let loggedInUser = {};
      loggedInUser.userName = user;
      loggedInUser.firstName = responseJson.firstName;
      loggedInUser.lastName = responseJson.lastName;
      loggedInUser.externalId = responseJson.externalId;
      loggedInUser.image = responseJson.image;
      loggedInUser.token = pwd;
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      yield put({
        type: SET_PROFILE,
        payload: profile
      })
    }
  } catch (err) {
    console.log(err)
    yield put({
      type: SET_ERROR_MESSAGE,
      payload: 'Unknown error'
    })
    // there was an authentication error remove any record in local storage
    window.localStorage.removeItem('loggedInUser');
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
    Authorization: token
  })

  const resp = yield call(ndexSave.saveToNDEx, cx, headers)
  console.log('resp', resp)
  console.log('resp.body' + resp.body)

  const responseText = yield call([resp, 'text'])

  let lastSlash = responseText.lastIndexOf('/');
  let networkUUID = responseText.substring(lastSlash+1);

  let origin_url = window.location.origin;
  
  let viewer_network = 'viewer/networks/';
  if (origin_url.slice(-1) !== '/'){
    viewer_network = '/' + viewer_network;
  } 
  const networkURL = origin_url + viewer_network + networkUUID;

  console.log('networkURL', networkURL);
  
  yield put({
    type: SET_NETWORK_URL,
    payload: networkURL
  })
}
