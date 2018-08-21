// alert

import { CLEAR_ALERT, SHOW_ALERT } from "../actions/types";

const initialState = {
  show: false,
  success: false,
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        show: true,
        success: true,
        message: action.payload
      };

    case CLEAR_ALERT:
      return initialState;

    default:
      return state;
  }
}
