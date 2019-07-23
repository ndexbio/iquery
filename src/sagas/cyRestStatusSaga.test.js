import { call, put, all, take, race } from 'redux-saga/effects'
import rootSaga from './cyRestStatusSaga'
import { _cyRestStatusSaga, _fetchCyRESTAvailable } from './cyRestStatusSaga'
import {
  SET_AVAILABLE,
  startCyRestPolling,
  stopCyRestPolling,
  START_CYREST_POLLING,
  STOP_CYREST_POLLING
} from '../actions/cyrest'

it('root saga', () => {
  const generator = rootSaga()
  expect(generator.next().value).toMatchObject(all([{}]))
  expect(generator.next().done).toEqual(true)
})

it('_cyRestStatusSaga start polling', () => {
  const generator = _cyRestStatusSaga(_fetchCyRESTAvailable)
  let next = generator.next()
  //console.log(value)
  next = generator.next(startCyRestPolling())
  //console.log(value)
  expect(next.value).toMatchObject(
    race([call(_fetchCyRESTAvailable), take(STOP_CYREST_POLLING)])
  )
})

it('_cyRestStatusSaga stop before fetch', () => {
  const generator = _cyRestStatusSaga(_fetchCyRESTAvailable)
  let next = generator.next()
  //console.log(value)
  next = generator.next(startCyRestPolling())
  //console.log(value)
  expect(next.value).toMatchObject(
    race([call(_fetchCyRESTAvailable), take(STOP_CYREST_POLLING)])
  )
  next = generator.next(stopCyRestPolling())
  console.log(next.value)
  console.log(next.done)
})

it('_cyRestStatusSaga fetch before stop', () => {
  let fetched = false

  function* myFetch() { console.log("yo")}

  const generator = _cyRestStatusSaga(myFetch)
  let next = generator.next()
  //console.log(value)
  next = generator.next(startCyRestPolling())
  //console.log(value)
  expect(next.value).toMatchObject(
    race([call(myFetch), take(STOP_CYREST_POLLING)])
  )

  next = generator.next(call(myFetch))
  console.log(next.value)
  console.log(next.done)
})
