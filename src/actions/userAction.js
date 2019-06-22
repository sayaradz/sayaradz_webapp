import {
  DELETE_FABRICANT_USER,
  GET_ERRORS,
  GET_FABRICANT_USERS,
  USER_LOADING
} from "./types";
import axios from "axios";

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
