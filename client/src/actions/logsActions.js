import axios from "axios";

import {
  GET_DOMESTIC_LOGS,
  GET_INTERNATIONAL_LOGS,
  SUCCESS_CREATE,
  GET_ERRORS,
  LOG_CLICKED
} from "./types";

// Get domestic logs
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

// Get international logs
export const getInternationalLogs = () => dispatch => {
  axios.get("/api/logs/international").then(res =>
    dispatch({
      type: GET_INTERNATIONAL_LOGS,
      payload: res.data
    })
  );
};

// Create international log
export const createInternationalLog = logData => dispatch => {
  axios
    .post("/api/logs/international", logData)
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

// Open log view
export const openLogView = log => dispatch => {
  console.log(log);
  dispatch({
    type: LOG_CLICKED,
    payload: log
  });
};
