import { GET_ERRORS, CLEAR_ERRORS, USER_LOGOUT } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
