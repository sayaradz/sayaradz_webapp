import axios from "axios";

import {
  ADD_COLOR,
  UPDATE_COLOR,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_COLORS,
  GET_COLOR,
  DELETE_COLOR,
  COLOR_LOADING
} from "./types";

// Add COLOR
export const addColor = colorData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/colors`, colorData)
    .then(res =>
      dispatch({
        type: ADD_COLOR,
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

// Update COLOR
export const updateColor = (id, colorData) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/colors/${id}`, colorData)
    .then(res =>
      dispatch({
        type: UPDATE_COLOR,
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
// Get COLORS
export const getColors = () => dispatch => {
  dispatch(setColorLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/colors`)
    .then(res =>
      dispatch({
        type: GET_COLORS,
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

// Get COLOR
export const getColor = id => dispatch => {
  dispatch(setColorLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/colors/${id}`)
    .then(res =>
      dispatch({
        type: GET_COLOR,
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

// Delete COLOR
export const deleteColor = id => dispatch => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_URL}/colors/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_COLOR,
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
    type: COLOR_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
