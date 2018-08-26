// auth

import { SET_CURRENT_USER, USER_LOGIN_LOADING } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
