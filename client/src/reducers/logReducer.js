// log

import {
  GET_DOMESTIC_LOGS,
  GET_INTERNATIONAL_LOGS,
  LOG_CLICKED,
  LOG_LOADING,
  ADD_DOMESTIC_LOG,
  ADD_INTERNATIONAL_LOG,
  ADD_STATUS,
  DELETE_STATUS
} from "../actions/types";

const initialState = {
  domestic: null,
  international: null,
  log: {
    operations: {
      preloading: { statuses: [] },
      loading: { statuses: [] },
      unloading: { statuses: [] }
    }
  },

  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_LOADING:
      return {
        ...state,
        loading: true
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

    default:
      return state;
  }
}
