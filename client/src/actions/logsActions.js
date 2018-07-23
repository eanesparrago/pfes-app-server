import axios from "axios";

import { GET_DOMESTIC_LOGS } from "./types";

// Get all users
export const getDomesticLogs = () => dispatch => {
  axios.get("/api/logs/domestic").then(res =>
    dispatch({
      type: GET_DOMESTIC_LOGS,
      payload: res.data
    })
  );
};