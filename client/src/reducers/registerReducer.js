// register

import { REGISTER_SUCCESS, CLEAR_REGISTER } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    case CLEAR_REGISTER:
      return {};

    default:
      return state;
  }
}
