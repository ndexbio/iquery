import { call, put, all, take, race } from "redux-saga/effects"
import { runSaga } from "redux-saga"
import * as cyRestStatusSaga from "./cyRestStatusSaga"
import rootSaga from "./cyRestStatusSaga"
import { _cyRestStatusSaga, _fetchCyRESTAvailable } from "./cyRestStatusSaga"
import * as cyrest from "../api/cyrest"
import sinon from "sinon"
import {
  SET_AVAILABLE,
  startCyRestPolling,
  stopCyRestPolling,
  START_CYREST_POLLING,
  STOP_CYREST_POLLING
} from "../actions/cyrest"

beforeEach(() => {
  sinon.stub(cyrest, "status") //add stub
})

afterEach(() => {
  cyrest.status.restore() //remove stub
})

test("root saga", () => {
  const generator = rootSaga()
  expect(generator.next().value).toMatchObject(all([{}]))
  expect(generator.next().done).toEqual(true)
})

test("_cyRestStatusSaga start polling", () => {
  const generator = _cyRestStatusSaga()
  let next = generator.next()
  //console.log(value)
  next = generator.next(startCyRestPolling())
  //console.log(value)
  expect(next.value).toMatchObject(
    race([call(_fetchCyRESTAvailable), take(STOP_CYREST_POLLING)])
  )
})

test("_fetchCyRESTAvailable success", async done => {
  expect.assertions(1)

  const dispatched = []

  cyrest.status.onCall(0).callsFake(cyRESTPort => ({
    json: () => ({
      some: "value"
    })
  }))

  cyrest.status.onCall(1).callsFake(() => {
    expect(dispatched).toEqual([{ type: "SET_AVAILABLE", payload: true }])
    done()
  })

  try {
    const result = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({ value: "test" })
      },
      _fetchCyRESTAvailable,
      {}
    ).toPromise()
  } finally {
    //statusStub.restore()
  }
}, 7000)

test("_fetchCyRESTAvailable failure", async done => {
  expect.assertions(1)

  const dispatched = []

  cyrest.status.onCall(0).callsFake(cyRESTPort => {
    throw "kaboom"
  })

  cyrest.status.onCall(1).callsFake(() => {
    expect(dispatched).toEqual([{ type: "SET_AVAILABLE", payload: false }])
    done()
  })

  try {
    const result = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({ value: "test" })
      },
      _fetchCyRESTAvailable,
      {}
    ).toPromise()
  } finally {
    //statusStub.restore()
  }
}, 7000)
