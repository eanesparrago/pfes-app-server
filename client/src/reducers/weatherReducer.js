import { GET_WEATHER, USER_LOGOUT, ERROR_WEATHER } from "../actions/types";

const initialState = {
  weather: {},
  loading: true,
  success: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER:
      return {
        ...state,
        weather: action.payload,
        loading: false,
        success: true
      };

    case ERROR_WEATHER:
      return {
        ...state,
        loading: false,
        success: false
      };

    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
}
