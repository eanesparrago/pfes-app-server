import axios from "axios";

import {
  GET_ALL_USERS,
  CLEAR_USERS,
  SUBMIT_USERS_REQUEST,
  RECEIVE_USERS_REPLY,
  GET_ERRORS,
  REGISTER_SUCCESS,
  SUBMIT_USERS_SUCCESS,
  RESET_USERS_SUCCESS
} from "./types";

// Get all users
export const getAllUsers = () => dispatch => {
  axios.get("/api/users/all").then(res =>
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    })
  );
};

// Clear users
export const clearUsers = () => {
  return { type: CLEAR_USERS, payload: [] };
};

// Register user
export const registerUser = userData => dispatch => {
  dispatch({ type: SUBMIT_USERS_REQUEST });

  axios
    .post("/api/users/register", userData)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      dispatch({ type: RECEIVE_USERS_REPLY });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });

      dispatch({ type: RECEIVE_USERS_REPLY });
    });
};

// Edit user
export const editUser = userData => dispatch => {
  dispatch({ type: SUBMIT_USERS_REQUEST });

  axios
    .post("/api/users/edit", userData)
    .then(res => {
      dispatch({ type: RECEIVE_USERS_REPLY });

      dispatch({ type: SUBMIT_USERS_SUCCESS, payload: "edit" });

      dispatch(getAllUsers());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });

      dispatch({ type: RECEIVE_USERS_REPLY });
    });
};

// Change password
export const changePassword = userData => dispatch => {
  dispatch({ type: SUBMIT_USERS_REQUEST });

  axios
    .post("/api/users/password", userData)
    .then(res => {
      dispatch({ type: RECEIVE_USERS_REPLY });

      dispatch({ type: SUBMIT_USERS_SUCCESS, payload: "password" });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });

      dispatch({ type: RECEIVE_USERS_REPLY });
    });
};

export const resetSuccess = () => dispatch => {
  dispatch({ type: RESET_USERS_SUCCESS });
};
