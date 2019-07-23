import { call, put, all, take, race } from 'redux-saga/effects'
import rootSaga from './cyRestStatusSaga'
import { _cyRestStatusSaga, _fetchCyRESTAvailable } from './cyRestStatusSaga'
import {
  SET_AVAILABLE,
  startCyRestPolling,
  START_CYREST_POLLING,
  STOP_CYREST_POLLING
} from '../actions/cyrest'

it('root saga', () => {
  const generator = rootSaga()
  expect(generator.next().value).toMatchObject(all([{}]))
  expect(generator.next().done).toEqual(true)
})

it('_cyRestStatusSaga', () => {
  const generator = _cyRestStatusSaga()
  let value = generator.next().value
  console.log(value)
  value = generator.next(startCyRestPolling()).value
  console.log(value)
  expect(value).toMatchObject(
    race([call(_fetchCyRESTAvailable), take(STOP_CYREST_POLLING)])
  )
  expect(generator.next().done).toEqual(false)
})
