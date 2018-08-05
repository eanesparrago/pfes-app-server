import axios from "axios";

import {
  GET_DOMESTIC_LOGS,
  GET_INTERNATIONAL_LOGS,
  GET_ERRORS,
  LOG_CLICKED,
  CLEAR_ERRORS,
  ADD_DOMESTIC_LOG,
  ADD_INTERNATIONAL_LOG,
  ADD_STATUS,
  DELETE_STATUS
} from "./types";

// /////////////////////////
// Get domestic logs
export const getDomesticLogs = () => dispatch => {
  axios.get("/api/logs/domestic").then(res =>
    dispatch({
      type: GET_DOMESTIC_LOGS,
      payload: res.data
    })
  );
};

// /////////////////////////
// Get international logs
export const getInternationalLogs = () => dispatch => {
  axios.get("/api/logs/international").then(res =>
    dispatch({
      type: GET_INTERNATIONAL_LOGS,
      payload: res.data
    })
  );
};

// /////////////////////////
// Create domestic log
export const createDomesticLog = logData => dispatch => {
  dispatch(clearErrors());

  axios
    .post("/api/logs/domestic", logData)
    .then(res =>
      dispatch({
        type: ADD_DOMESTIC_LOG,
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

// /////////////////////////
// Create international log
export const createInternationalLog = logData => dispatch => {
  dispatch(clearErrors());

  axios
    .post("/api/logs/international", logData)
    .then(res =>
      dispatch({
        type: ADD_INTERNATIONAL_LOG,
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

// /////////////////////////
// Open log view
export const openLogView = log => dispatch => {
  dispatch({
    type: LOG_CLICKED,
    payload: log
  });
};

// /////////////////////////
// Edit log
export const editLog = log => dispatch => {
  // console.log("editLog", log);

  if (log.type === "Domestic") {
    axios
      .post("/api/logs/domestic/edit", log)
      .then(res => {
        dispatch({
          type: LOG_CLICKED,
          payload: res.data
        });
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }

  if (log.type === "International") {
    axios
      .post("/api/logs/international/edit", log)
      .then(res => {
        dispatch({
          type: LOG_CLICKED,
          payload: res.data
        });
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// /////////////////////////
// Add domestic/international log status
export const addStatus = (log, statusData) => dispatch => {
  dispatch(clearErrors());

  console.log("log:", log);

  if (log.type === "Domestic") {
    if (statusData.stage === "preloading") {
      axios
        .post(`/api/operations/domestic/${log._id}/status`, statusData)
        .then(res => {
          dispatch({
            type: ADD_STATUS,
            payload: res.data
          });
          console.log(res.data);
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }

    if (statusData.stage === "loading") {
      axios
        .post(`/api/operations/domestic/${log._id}/status`, statusData)
        .then(res => {
          dispatch({
            type: ADD_STATUS,
            payload: res.data
          });
          console.log(res.data);
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }

    if (statusData.stage === "unloading") {
      axios
        .post(`/api/operations/domestic/${log._id}/status`, statusData)
        .then(res => {
          dispatch({
            type: ADD_STATUS,
            payload: res.data
          });
          console.log(res.data);
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  }

  if (log.type === "International") {
    if (statusData.stage === "preloading") {
      axios
        .post(`/api/operations/international/${log._id}/status`, statusData)
        .then(res => {
          dispatch({
            type: ADD_STATUS,
            payload: res.data
          });
          console.log(res.data);
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }

    if (statusData.stage === "loading") {
      axios
        .post(`/api/operations/international/${log._id}/status`, statusData)
        .then(res => {
          dispatch({
            type: ADD_STATUS,
            payload: res.data
          });
          console.log(res.data);
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }

    if (statusData.stage === "unloading") {
      axios
        .post(`/api/operations/international/${log._id}/status`, statusData)
        .then(res => {
          dispatch({
            type: ADD_STATUS,
            payload: res.data
          });
          console.log(res.data);
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  }
};

// /////////////////////////
// Delete domestic/international status
export const deleteStatus = (log, statusData, stage) => dispatch => {
  if (log.type === "Domestic") {
    axios
      .post(`/api/operations/domestic/${log._id}/status/${statusData}`, stage)
      .then(res =>
        dispatch({
          type: DELETE_STATUS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }

  if (log.type === "International") {
    axios
      .post(
        `/api/operations/international/${log._id}/status/${statusData}`,
        stage
      )
      .then(res =>
        dispatch({
          type: DELETE_STATUS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// /////////////////////////
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
