// auth

import {
  SET_CURRENT_USER,
  USER_LOGIN_LOADING,
  ADD_DOMESTIC_LOG,
  ADD_INTERNATIONAL_LOG,
  SUBMIT_COMPLETE_LOG,
  SUBMIT_COMPLETE
} from "../actions/types";
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

    case ADD_DOMESTIC_LOG:
      return {
        ...state,
        user: {
          ...state.user,
          logsAdded: state.user.logsAdded + 1
        }
      };

    case ADD_INTERNATIONAL_LOG:
      return {
        ...state,
        user: {
          ...state.user,
          logsAdded: state.user.logsAdded + 1
        }
      };

    case SUBMIT_COMPLETE:
      return {
        ...state,
        user: {
          ...state.user,
          logsCompleted: state.user.logsCompleted + 1
        }
      };

    case SUBMIT_COMPLETE_LOG:
      return {
        ...state,
        user: {
          ...state.user,
          logsCompleted: state.user.logsCompleted + 1
        }
      };

    default:
      return state;
  }
}
