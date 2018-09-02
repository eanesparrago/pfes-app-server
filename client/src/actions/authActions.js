import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOGOUT,
  CLEAR_ERRORS,
  GET_WEATHER,
  USER_LOGIN_LOADING
} from "./types";

// Login - Get user token
export const loginUser = userData => dispatch => {
  dispatch(clearErrors());

  dispatch({ type: USER_LOGIN_LOADING, payload: true });

  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));

      dispatch(getWeather());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });

      dispatch({ type: USER_LOGIN_LOADING, payload: false });
    });
};

/*
The weather is fetched from https://darksky.net/.
It is limited to 1,000 API requests per day.
Thus, the weather is only fetched whenever the user logs in.
*/
export const getWeather = () => dispatch => {
  const geolocation = navigator.geolocation;

  let coordinates;

  geolocation.getCurrentPosition(position => {
    coordinates = position.coords;

    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/19218d2614796b023be50699767d8e21/${
        coordinates.latitude
      },${coordinates.longitude}`
    )
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: GET_WEATHER,
          payload: data
        });
      });
  });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAutenticated to false
  dispatch(setCurrentUser({}));

  // dispatch({ type: CLEAR_USERS, payload: null });
  dispatch({ type: USER_LOGOUT });
};

// /////////////////////////
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
