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
  DELETE_STATUS,
  SHOW_ALERT,
  SUBMIT_REQUEST,
  RECEIVE_REPLY
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

  dispatch({ type: SUBMIT_REQUEST });

  axios
    .post("/api/logs/domestic", logData)
    .then(res => {
      dispatch({
        type: ADD_DOMESTIC_LOG,
        payload: res.data
      });

      dispatch({
        type: SHOW_ALERT,
        payload: `Domestic Job Order #${
          res.data.domJo
        } was successfully created`
      });

      dispatch({
        type: RECEIVE_REPLY
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });

      dispatch({
        type: RECEIVE_REPLY
      });
    });
};

// /////////////////////////
// Create international log
export const createInternationalLog = logData => dispatch => {
  dispatch(clearErrors());

  dispatch({ type: SUBMIT_REQUEST });

  axios
    .post("/api/logs/international", logData)
    .then(res => {
      dispatch({
        type: ADD_INTERNATIONAL_LOG,
        payload: res.data
      });

      dispatch({
        type: SHOW_ALERT,
        payload: `International Job Order #${
          res.data.domJo
        } was successfully created`
      });

      dispatch({
        type: RECEIVE_REPLY
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });

      dispatch({
        type: RECEIVE_REPLY
      });
    });
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
  dispatch(clearErrors());

  dispatch({ type: SUBMIT_REQUEST });

  if (log.type === "Domestic") {
    axios
      .post("/api/logs/domestic/edit", log)
      .then(res => {
        dispatch({
          type: LOG_CLICKED,
          payload: res.data
        });

        dispatch({
          type: SHOW_ALERT,
          payload: `Domestic Job Order #${
            res.data.domJo
          } was successfully edited`
        });

        dispatch({
          type: RECEIVE_REPLY
        });

        dispatch(getDomesticLogs());
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });

        dispatch({
          type: RECEIVE_REPLY
        });
      });
  }

  if (log.type === "International") {
    axios
      .post("/api/logs/international/edit", log)
      .then(res => {
        dispatch({
          type: LOG_CLICKED,
          payload: res.data
        });

        dispatch({
          type: SHOW_ALERT,
          payload: `International Job Order #${
            res.data.domJo
          } was successfully edited`
        });

        dispatch({
          type: RECEIVE_REPLY
        });

        dispatch(getInternationalLogs());
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });

        dispatch({
          type: RECEIVE_REPLY
        });
      });
  }
};

// ////////////////////////
// Submit Complete Log
export const submitCompleteLog = data => dispatch => {
  axios.post("/api/logs/complete", data).then(res => {
    if (data.type === "Domestic") {
      dispatch({
        type: LOG_CLICKED,
        payload: res.data
      });

      dispatch({
        type: SHOW_ALERT,
        payload: `Domestic Job Order #${
          res.data.domJo
        } was successfully marked as complete`
      });

      dispatch(getDomesticLogs());
    } else if (data.type === "International") {
      dispatch({
        type: LOG_CLICKED,
        payload: res.data
      });

      dispatch({
        type: SHOW_ALERT,
        payload: `Domestic Job Order #${
          res.data.domJo
        } was successfully marked as complete`
      });

      dispatch(getInternationalLogs());
    }
  });
};

// ////////////////////////
// Delete log (admin)
export const deleteLog = log => dispatch => {
  if (window.confirm("Are you sure? This log will be permanently deleted.")) {
    if (log.type === "Domestic") {
      axios
        .delete(`/api/logs/domestic/${log._id}`)
        .then(res => {
          dispatch(getDomesticLogs());
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
        .delete(`/api/logs/international/${log._id}`)
        .then(res => {
          dispatch(getInternationalLogs());
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
// Submit complete
export const submitComplete = (log, statusData) => dispatch => {
  dispatch(clearErrors());

  if (log.type === "Domestic") {
    axios
      .post(`/api/operations/domestic/${log._id}`, statusData)
      .then(res => {
        dispatch({
          type: LOG_CLICKED,
          payload: res.data
        });

        dispatch(getDomesticLogs());
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
      .post(`/api/operations/international/${log._id}`, statusData)
      .then(res => {
        dispatch({
          type: LOG_CLICKED,
          payload: res.data
        });

        dispatch(getInternationalLogs());
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
    axios
      .post(`/api/operations/domestic/${log._id}/status`, statusData)
      .then(res => {
        dispatch({
          type: ADD_STATUS,
          payload: res.data
        });

        dispatch(getDomesticLogs());
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
      .post(`/api/operations/international/${log._id}/status`, statusData)
      .then(res => {
        dispatch({
          type: ADD_STATUS,
          payload: res.data
        });

        dispatch(getInternationalLogs());
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
// Delete domestic/international status
export const deleteStatus = (log, statusData, stage) => dispatch => {
  if (window.confirm("Are you sure?")) {
    if (log.type === "Domestic") {
      axios
        .post(`/api/operations/domestic/${log._id}/status/${statusData}`, stage)
        .then(res => {
          dispatch({
            type: DELETE_STATUS,
            payload: res.data
          });
          dispatch(getDomesticLogs());
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
        .post(
          `/api/operations/international/${log._id}/status/${statusData}`,
          stage
        )
        .then(res => {
          dispatch({
            type: DELETE_STATUS,
            payload: res.data
          });
          dispatch(getInternationalLogs());
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

// ////////////////////////
// Delete complete
export const deleteComplete = (log, statusData) => dispatch => {
  if (window.confirm("Are you sure?")) {
    dispatch(clearErrors());

    if (log.type === "Domestic") {
      axios
        .post(`/api/operations/domestic/${log._id}`, statusData)
        .then(res => {
          dispatch({
            type: LOG_CLICKED,
            payload: res.data
          });

          dispatch(getDomesticLogs());
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
        .post(`/api/operations/international/${log._id}`, statusData)
        .then(res => {
          dispatch({
            type: LOG_CLICKED,
            payload: res.data
          });

          dispatch(getInternationalLogs());
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
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
