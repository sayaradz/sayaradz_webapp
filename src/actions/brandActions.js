import axios from "axios";

import {
  GET_BRANDS,
  GET_BRAND,
  DELETE_BRAND,
  ADD_BRAND,
  UPDATE_BRAND,
  GET_ERRORS,
  CLEAR_ERRORS,
  MODEL_LOADING,
  GET_FABRICANTS
} from "./types";

// Add BRAND
export const addModel = (brandData, fabId) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/brands`, brandData)
    .then(res => {
      //Adding the brand to its fabricant brands list
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/manufacturers/${fabId}/brands`,
          { brand_id: res.data._id }
        )
        .then(() => {
          //Get fabricants list
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
      //New brand dispatch to state
      dispatch({
        type: ADD_BRAND,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update BRAND
export const updateModel = (id, brandData, oldFab, newFabId) => dispatch => {
  dispatch(clearErrors());
  //if Fabricant changed
  if (!(oldFab.length === 1 && oldFab[0]._id === newFabId)) {
    //if brand had a Fabricant delete the brand from that Fabricant brands list
    if (oldFab.length !== 0)
      oldFab.forEach(fab => {
        if (fab !== null)
          axios
            .delete(
              `${process.env.REACT_APP_BACKEND_URL}/manufacturers/${
                fab._id
              }/brands/${id}`
            )
            .catch(err =>
              dispatch({
                type: GET_ERRORS,
                payload: err.response.data
              })
            );
      });
    //Add the brand to the new Fabricant brands list
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/manufacturers/${newFabId}/brands`,
        { brand_id: id }
      )
      .then(() => {
        //Get fabricants list
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
  }
  //Make the other changes to the brand
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
        type: GET_ERRORS,
        payload: err.response.data
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
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Brand
export const deleteBrand = (id, oldFabs) => dispatch => {
  //if brand had a Fabricant delete the brand from that Fabricant brands list
  if (oldFabs.length !== 0)
    oldFabs.forEach(fab => {
      if (fab !== null)
        axios
          .delete(
            `${process.env.REACT_APP_BACKEND_URL}/manufacturers/${
              fab._id
            }/brands/${id}`
          )
          .then(() => {
            //Get fabricants list
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
    });
  //Delete the brand
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
