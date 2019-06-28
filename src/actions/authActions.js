import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/auth/signin`, userData)
    .then(res => {
      // get user date from response
      const { token, user } = res.data;

      // user role not allowed => clean(remove) user information with logoutUser()
      if (!["manufacturer", "admin"].includes(user.role)) {
        logoutUser();
        return;
      }

      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Set current user
      dispatch(setCurrentUser(user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const getUser = id => dispatch => {
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`)
    .then(res => {
      // save user info to store => will be accessible everywhere in the app
      dispatch(setCurrentUser(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
