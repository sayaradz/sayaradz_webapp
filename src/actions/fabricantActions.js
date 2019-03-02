import axios from 'axios'

import {
  ADD_FABRICANT,
  UPDATE_FABRICANT,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_FABRICANTS,
  GET_FABRICANT,
  DELETE_FABRICANT,
  FABRICANT_LOADING
} from './types'

// Add Fabricant
export const addFabricant = fabData => dispatch => {
  dispatch(clearErrors())
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/manufacturers`, fabData)
    .then(res =>
      dispatch({
        type: ADD_FABRICANT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Update Fabricant
export const updateFabricant = (id, fabData) => dispatch => {
  dispatch(clearErrors())
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/manufacturers/${id}`, fabData)
    .then(res =>
      dispatch({
        type: UPDATE_FABRICANT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
// Get Fabricants
export const getFabricants = () => dispatch => {
  dispatch(setFabricantLoading())
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/manufacturers`)
    .then(res =>
      dispatch({
        type: GET_FABRICANTS,
        payload: res.data.rows
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FABRICANTS,
        payload: null
      })
    )
}

// Get Fabricant
export const getFabricant = id => dispatch => {
  dispatch(setFabricantLoading())
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/manufacturers/${id}`)
    .then(res =>
      dispatch({
        type: GET_FABRICANT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FABRICANT,
        payload: null
      })
    )
}

// Delete Fabricant
export const deleteFabricant = id => dispatch => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_URL}/manufacturers/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_FABRICANT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set loading state
export const setFabricantLoading = () => {
  return {
    type: FABRICANT_LOADING
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
