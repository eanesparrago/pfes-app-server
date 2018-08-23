// activity

import {
  SET_ACTIVITY_LOADING,
  GET_DOMESTIC_ACTIVITIES,
  GET_INTERNATIONAL_ACTIVITIES,
  USER_LOGOUT
} from "../actions/types";

const initialState = {
  domestic: { activities: {}, loading: true },
  international: { activities: {}, loading: true }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVITY_LOADING:
      return {
        ...state,
        domestic: { loading: true },
        international: { loading: true }
      };

    case GET_DOMESTIC_ACTIVITIES:
      return {
        ...state,
        domestic: { activities: action.payload, loading: false }
      };

    case GET_INTERNATIONAL_ACTIVITIES:
      return {
        ...state,
        international: { activities: action.payload, loading: false }
      };

    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
}
