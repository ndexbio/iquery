import { handleActions, combineActions } from "redux-actions"
import { addApplication, removeApplication } from "../actions/applications"

const defaultState = {
  applications: ["hiview", "naga"] // Gene list
}

const applications = handleActions(
  {
    [addApplication]: (state, payload) => {
      console.log("SET;", payload)
      return {
        ...state,
        applications: state.applications.push(payload.payload)
      }
    },
    [removeApplication]: (state, payload) => {
      return {
        ...state,
        applications: state.applications.remove(payload.payload)
      }
    }
  },
  defaultState
)

export default applications
