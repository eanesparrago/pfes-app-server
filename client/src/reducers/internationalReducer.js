import {
  GET_INTERNATIONAL_LOGS,
  USER_LOGOUT
} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INTERNATIONAL_LOGS:
      return action.payload;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
