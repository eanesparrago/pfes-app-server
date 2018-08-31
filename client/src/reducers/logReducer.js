// log

import {
  GET_DOMESTIC_LOGS,
  GET_INTERNATIONAL_LOGS,
  LOG_CLICKED,
  LOG_LOADING,
  ADD_DOMESTIC_LOG,
  ADD_INTERNATIONAL_LOG,
  ADD_STATUS,
  DELETE_STATUS,
  USER_LOGOUT,
  SUBMIT_REQUEST,
  RECEIVE_REPLY
} from "../actions/types";

const initialState = {
  domestic: null,
  international: null,
  log: {
    commodity: {},
    tags: {},
    contact: {},
    origin: {},
    portOfDeparture: {},
    portOfArrival: {},
    destination: {},
    operations: {
      preloading: { statuses: [] },
      loading: { statuses: [] },
      unloading: { statuses: [] }
    }
  },
  submitInProgress: false,

  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_LOADING:
      return {
        ...state,
        loading: true
      };

    case SUBMIT_REQUEST:
      return {
        ...state,
        submitInProgress: true
      };

    case RECEIVE_REPLY:
      return {
        ...state,
        submitInProgress: false
      };

    case GET_DOMESTIC_LOGS:
      return {
        ...state,
        domestic: action.payload,
        loading: false
      };

    case GET_INTERNATIONAL_LOGS:
      return {
        ...state,
        international: action.payload,
        loading: false
      };

    case ADD_DOMESTIC_LOG:
      return {
        ...state,
        domestic: [action.payload, ...state.domestic]
      };

    case ADD_INTERNATIONAL_LOG:
      return {
        ...state,
        international: [action.payload, ...state.international]
      };

    case ADD_STATUS:
      return {
        ...state,
        log: action.payload
      };

    case DELETE_STATUS:
      return {
        ...state,
        log: action.payload
      };

    case LOG_CLICKED:
      return {
        ...state,
        log: action.payload
      };

    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
}
