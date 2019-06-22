import {
  DELETE_FABRICANT_USER,
  GET_ERRORS,
  GET_FABRICANT_USERS,
  USER_LOADING,
  CLEAR_ERRORS,
  UPDATE_USER,
  ADD_USER
} from "./types";
import axios from "axios";

// Add User
export const addUser = (id, userData) => async dispatch => {
  dispatch(clearErrors());
  const newUser = await Promise.all([
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, userData)
  ]);

  await axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/users/${
        newUser.data._id
      }/manufacturers`,
      { manufacturer_id: id }
    )
    .then(res =>
      dispatch({
        type: ADD_USER,
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
        type: GET_FABRICANT_USERS,
        payload: null
      })
    );
};
// Update User
export const updateUser = (id, userData) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/manufacturers/${id}/`, userData)
    .then(res =>
      dispatch({
        type: UPDATE_USER,
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
      `${process.env.REACT_APP_BACKEND_URL}/${id}/manufacturers/${userId}`
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
