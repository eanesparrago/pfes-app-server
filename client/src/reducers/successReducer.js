// success

import {
  ADD_DOMESTIC_LOG,
  CLEAR_SUCCESS,
  ADD_INTERNATIONAL_LOG
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_DOMESTIC_LOG:
      return action.payload;

    case ADD_INTERNATIONAL_LOG:
      return action.payload;

    case CLEAR_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
