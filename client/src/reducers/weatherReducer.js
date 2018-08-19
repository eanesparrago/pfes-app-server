import { GET_WEATHER, USER_LOGOUT } from "../actions/types";

const initialState = {
  weather: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER:
      return {
        ...state,
        weather: action.payload,
        loading: false
      };

    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
}
