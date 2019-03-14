import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as cyrest from '../api/cyrest'

import {
  IMPORT_NETWORK_STARTED,
  IMPORT_NETWORK_FAILED,
  IMPORT_NETWORK_SUCCEEDED
} from '../actions/cyrest'

export default function* cyrestSaga() {
  console.log('cyrestSaga reporting for duty')
  yield takeLatest(IMPORT_NETWORK_STARTED, watchImportNetwork)
}

export const getUIState = state => state.uiState

/**
 * Calling CyREST network import
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function* watchImportNetwork(action) {
  const originalCX = action.payload

  console.log('watchImportNetwork', action.payload)

  try {
    const uiState = yield select(getUIState)
    const cyrestport = uiState.urlParams.has('cyrestport')
      ? uiState.urlParams.get('cyrestport')
      : 1234

    let addNumberVerification = true

    originalCX.forEach(aspect => {
      if (aspect['numberVerification']) {
        addNumberVerification = false
      }
    })
    // Add number verification to fool old versions of CyNDEx-2
    // remove this step if numberVerification is added elsewhere
    // or ignored in later versions of CyNDEx-2
    const patchedCX = (addNumberVerification
      ? [{ numberVerification: [{ longNumber: 281474976710655 }] }]
      : []
    ).concat(originalCX)

    //console.log('CX', patchedCX)

    const response = yield call(cyrest.importNetwork, cyrestport, patchedCX)

    console.log('CyREST response:', response)

    yield put({
      type: IMPORT_NETWORK_SUCCEEDED,
      payload: {}
    })
  } catch (e) {
    console.warn('CyREST import network error:', e)
    yield put({
      type: IMPORT_NETWORK_FAILED,
      payload: {
        message: 'CyREST import network error',
        error: e.message
      }
    })
  }
}
