import axios from "axios";

import { GET_ALL_USERS } from "./types";

// Get all users
export const getAllUsers = () => dispatch => {
  axios.get("/api/users/all").then(res =>
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    })
  );
};
