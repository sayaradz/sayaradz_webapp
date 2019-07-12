import axios from "axios";

import {
  GET_MODELS,
  GET_ERRORS,
  ADD_VERSION,
  ADD_MODEL,
  DELETE_MODEL,
  MODEL_LOADING,
  CLEAR_ERRORS, SET_CURRENT_MODEL
} from "./types";

// Get Modeles
export const getModels = () => dispatch => {
  dispatch(setModelLoading());

  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/models`)
    .then(res =>
      dispatch({
        type: GET_MODELS,
        payload: res.data.rows
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MODELS,
        payload: null
      })
    );
};

// Get Modeles
export const getBrand = marqueId => dispatch => {
  dispatch(setModelLoading());

  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/brands/${marqueId}`)
    .then(res =>{
      console.log("get brands:", res.data);
      dispatch({
        type: GET_MODELS,
        payload: res.data
      })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    )
};

// Add Model
export const addModel = modelData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/models`, modelData)
    .then(res => {
      console.log(res)
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/brands/5d0e64dd6c5d750017f46454/models`, {model_id: res.data._id})
      dispatch({
        type: ADD_MODEL,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

};

// Add Versions
export const addVersion = versionData => dispatch => {
  dispatch(clearErrors());
  axios.
  post(`${process.env.REACT_APP_BACKEND_URL}/versions`, versionData.version)
    .then(res => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/models/${versionData.modelId}/versions`,
          {version_id: res.data._id}
        )
        .then(res => {
          axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/models/${versionData.modelId}`)
            .then(res => {
              dispatch({
                type: ADD_VERSION,
                payload: res.data
              })
            })
        })
    })
  ;
  /*axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/models/:modelId/versions`, versionData)
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
    );*/
};

// Delete Model
export const deleteModel = id => dispatch => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_URL}/models/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_MODEL,
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

export const setCurrentModel = modelId=> dispatch =>{
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/models/${modelId}`)
    .then(model => {
      console.log(model.data)
      dispatch( {
        type: SET_CURRENT_MODEL,
        payload: model.data
      })
    })
};

// Set loading state
export const setModelLoading = () => {
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


