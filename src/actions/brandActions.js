import axios from "axios";

import {
  ADD_VERSION,
  UPDATE_MODEL,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_BRANDS,
  GET_MODEL,
  DELETE_BRAND,
  MODEL_LOADING
} from "./types";

// Add BRAND
export const addModel = brandData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/brands`, brandData)
    .then(res =>
      dispatch({
        type: ADD_VERSION,
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

// Update BRAND
export const updateModel = (id, brandData) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/brands/${id}`, brandData)
    .then(res =>
      dispatch({
        type: UPDATE_MODEL,
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
// Get BRANDS
export const getBrands = () => dispatch => {
  dispatch(setBrandLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/brands`)
    .then(res =>
      dispatch({
        type: GET_BRANDS,
        payload: res.data.rows
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BRANDS,
        payload: null
      })
    );
};

// Get BRAND
export const getBrand = id => dispatch => {
  dispatch(setBrandLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/brands/${id}`)
    .then(res =>
      dispatch({
        type: GET_MODEL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MODEL,
        payload: null
      })
    );
};

// Delete Brand
export const deleteBrand = id => dispatch => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_URL}/brands/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_BRAND,
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
export const setBrandLoading = () => {
  return {
    type: MODEL_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
