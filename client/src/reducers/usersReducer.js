// users

import {
  GET_ALL_USERS,
  CLEAR_USERS,
  USER_LOGOUT,
  SUBMIT_USERS_REQUEST,
  RECEIVE_USERS_REPLY,
  SUBMIT_USERS_SUCCESS,
  RESET_USERS_SUCCESS
} from "../actions/types";

const initialState = {
  list: [],
  submitInProgress: false,
  loading: false,

  success: {
    isSuccessful: false,
    type: ""
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        list: action.payload
      };

    case CLEAR_USERS:
      return {
        ...state,
        list: action.payload
      };

    case SUBMIT_USERS_REQUEST:
      return {
        ...state,
        submitInProgress: true
      };

    case RECEIVE_USERS_REPLY:
      return {
        ...state,
        submitInProgress: false
      };

    case SUBMIT_USERS_SUCCESS:
      return {
        ...state,
        success: {
          isSuccessful: true,
          type: action.payload
        }
      };

    case RESET_USERS_SUCCESS:
      return {
        ...state,
        success: {
          isSuccessful: false,
          type: ""
        }
      };

    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
}
