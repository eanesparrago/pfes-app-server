// register

import { REGISTER_SUCCESS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: action.payload
      };

    default:
      return state;
  }
}
