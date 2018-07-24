import axios from "axios";

import { GET_DOMESTIC_LOGS, SUCCESS_CREATE, GET_ERRORS } from "./types";

// Get all users
export const getDomesticLogs = () => dispatch => {
  axios.get("/api/logs/domestic").then(res =>
    dispatch({
      type: GET_DOMESTIC_LOGS,
      payload: res.data
    })
  );
};

// Create domestic log
export const createDomesticLog = logData => dispatch => {
  axios
    .post("/api/logs/domestic", logData)
    .then(res =>
      dispatch({
        type: SUCCESS_CREATE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
