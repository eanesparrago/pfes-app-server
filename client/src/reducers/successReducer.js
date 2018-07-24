import { SUCCESS_CREATE, CLEAR_SUCCESS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_CREATE:
      return action.payload;
      
    case CLEAR_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
