import axios from "axios";

import {
  ADD_BRAND,
  UPDATE_BRAND,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_BRANDS,
  GET_BRAND,
  DELETE_BRAND,
  BRAND_LOADING
} from "./types";

// Add BRAND
export const addBrand = brandData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/brands`, brandData)
    .then(res =>
      dispatch({
        type: ADD_BRAND,
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
export const updateBrand = (id, brandData) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/brands/${id}`, brandData)
    .then(res =>
      dispatch({
        type: UPDATE_BRAND,
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
        type: GET_BRAND,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BRAND,
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
    type: BRAND_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
