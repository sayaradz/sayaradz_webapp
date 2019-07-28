import {
  DELETE_FABRICANT_USER,
  UPDATE_FABRICANT_USER,
  GET_FABRICANT_USERS,
  ADD_FABRICANT_USER,
  GET_ERRORS,
  USER_LOADING,
  CLEAR_ERRORS
} from "./types";
import axios from "axios";

// Add Fabricant User
export const addUser = (id, userData) => async dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/users`, userData)
    .then((
      res //res.data contains "token" and "user", the latter still isn't attributed a manufacturer
    ) => {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/users/${
            res.data.user._id
          }/manufacturers`,
          { manufacturer_id: id }
        )
        .then((
          res //res.data contains the user with the manufacturer attributed to it
        ) => {
          dispatch({
            type: ADD_FABRICANT_USER,
            payload: res.data
          });
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Get Users
export const getUsers = id => dispatch => {
  dispatch(setUserLoading());

  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/manufacturers/${id}/users`)
    .then(res =>
      dispatch({
        type: GET_FABRICANT_USERS,
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
// Update User
export const updateUser = (id, userData) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/manufacturers/${id}`, userData)
    .then(res =>
      dispatch({
        type: UPDATE_FABRICANT_USER,
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
// Delete User
export const deleteUser = (id, userId) => dispatch => {
  axios
    .delete(
      `${
        process.env.REACT_APP_BACKEND_URL
      }/users/${userId}/manufacturers/${id}`,
      { manufacturer_id: id }
    )
    .then(res =>
      dispatch({
        type: DELETE_FABRICANT_USER,
        payload: userId
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
