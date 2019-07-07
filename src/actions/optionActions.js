import axios from "axios";

import {
  ADD_OPTION,
  UPDATE_OPTION,
  GET_OPTIONS,
  GET_OPTION,
  DELETE_OPTION,
  OPTION_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

// Add OPTION
export const addOption = optionData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/options`, optionData)
    .then(res =>
      dispatch({
        type: ADD_OPTION,
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

// Update OPTION
export const updateOption = (id, optionData) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/options/${id}`, optionData)
    .then(res =>
      dispatch({
        type: UPDATE_OPTION,
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
// Get OPTIONS
export const getOptions = () => dispatch => {
  dispatch(setColorLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/options`)
    .then(res =>
      dispatch({
        type: GET_OPTIONS,
        payload: res.data.rows
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Get OPTION
export const getOption = id => dispatch => {
  dispatch(setColorLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/options/${id}`)
    .then(res =>
      dispatch({
        type: GET_OPTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Delete OPTION
export const deleteOption = id => dispatch => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_URL}/options/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_OPTION,
        payload: id
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
export const setColorLoading = () => {
  return {
    type: OPTION_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
