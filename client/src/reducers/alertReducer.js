// alert

import { CLEAR_ALERT } from "../actions/types";

const initialState = {
  show: false,
  success: false,
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ALERT:
      return initialState;

    default:
      return state;
  }
}
