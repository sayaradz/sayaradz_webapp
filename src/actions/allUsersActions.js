import axios from "axios";
import {
  GET_USERS,
  UPDATE_USER_STATUS,
  GET_ERRORS,
  USER_LOADING,
  CLEAR_ERRORS
} from "./types";
/**
 *
 * This file handles all users actions, not manufacturers users
 */

// Get Users
export const getUsers = () => dispatch => {
  dispatch(setUserLoading());

  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/users`)
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data.rows
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

// update User status
export const updateUserStatus = (id, status) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/users/${id}/status`, { status })
    .then(res =>
      dispatch({
        type: UPDATE_USER_STATUS,
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

// Set loading state
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
