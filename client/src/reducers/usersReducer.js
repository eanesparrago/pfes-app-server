// users

import { GET_ALL_USERS, CLEAR_USERS, USER_LOGOUT } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;

    case CLEAR_USERS:
      return action.payload;
      
    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
}
