// register

import {
  REGISTER_SUCCESS,
  CLEAR_REGISTER,
  USER_LOGOUT
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    case CLEAR_REGISTER:
      return initialState;

    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
}
