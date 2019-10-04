import source from '../source'
import { SET_CURRENT_SOURCE } from '../../actions/source'

import { SourceState } from '../types'

describe('Test for source reducer', () => {
  it('Check initial state', () => {
    const state = undefined
    const action = { type: 'dummy_action' }
    const defaultState: SourceState = {
      isFetchingSource: false,
      sources: [],
      error: null,
      currentSource: null
    }

    const result = source(state, action)
    expect(result).toEqual(defaultState)
  })

  it('Set new current source', () => {
    const dummySource = {
      sourceName: 'sample1'
    }
    const action = { type: SET_CURRENT_SOURCE, payload: dummySource }
    const defaultState: SourceState = {
      isFetchingSource: false,
      sources: [],
      error: null,
      currentSource: null
    }

    const result = source(defaultState, action)
    expect(result.currentSource).toEqual(dummySource)
  })
})
