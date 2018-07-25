// log

import { LOG_CLICKED } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_CLICKED:
      return action.payload;

    default:
      return state;
  }
}
