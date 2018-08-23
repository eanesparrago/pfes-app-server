import axios from "axios";

import {
  GET_DOMESTIC_ACTIVITIES,
  GET_INTERNATIONAL_ACTIVITIES,
  SET_ACTIVITY_LOADING
} from "./types";

// /////////////////////////
// Get all (domestic and international) activties
export const getAllActivities = () => dispatch => {
  dispatch(setActivityLoading());

  dispatch(getDomesticActivities());
  dispatch(getInternationalActivities());
};

// /////////////////////////
// Get domestic activities
export const getDomesticActivities = () => dispatch => {
  axios.get("/api/activities/domestic").then(res => {
    dispatch({
      type: GET_DOMESTIC_ACTIVITIES,
      payload: res.data
    });
  });
};

// /////////////////////////
// Get international activities
export const getInternationalActivities = () => dispatch => {
  axios.get("/api/activities/international").then(res => {
    dispatch({
      type: GET_INTERNATIONAL_ACTIVITIES,
      payload: res.data
    });
  });
};

// /////////////////////////
// Set activities loading
export const setActivityLoading = () => {
  return {
    type: SET_ACTIVITY_LOADING

  };
};
