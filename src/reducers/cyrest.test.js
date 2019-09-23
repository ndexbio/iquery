import cyrestReducer from "./cyrest.js"
import { SET_PORT } from "../actions/cyrest.js"

it("initial state", () => {
  const action = { type: "dummy_action" }
  const initialState = {
    available: false,
    error: null,
    isFetchingAvailable: false,
    isPollingAvailable: false,
    port: 1234
  }

  expect(cyrestReducer(undefined, action)).toEqual(initialState)
})

it("SET_PORT", () => {
  const action = { type: SET_PORT, payload: 1235 }
  const state = {
    available: false,
    error: null,
    isFetchingAvailable: false,
    isPollingAvailable: false,
    port: 1235
  }
  expect(cyrestReducer(undefined, action)).toEqual(state)
})
