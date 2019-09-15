import axios from "axios";

import {
  ADD_VERSION,
  VERSION_LOADING,
  GET_VERSIONS,
  GET_VERSION,
  DELETE_VERSION,
  CLEAR_ERRORS,
  GET_ERRORS
} from "./types";

// Get Versions
export const getVersions = id => dispatch => {
  dispatch(setVersionLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/models/${id}`)
    .then(res => {
      console.log("got versions");
      dispatch({
        type: GET_VERSIONS,
        payload: res.data.versions
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Get Version
export const getVersion = id => dispatch => {
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/versions/${id}`)
    .then(res => {
      console.log("new version", res.data);
      dispatch({
        type: GET_VERSION,
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
// Add Versions
export const addVersion = versionData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/versions`, versionData.version)
    .then(res => {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/models/${versionData.modelId}/versions`,
          { version_id: res.data._id }
        )
        .then(res => {
          console.log(res);
        });
    });
};

// Delete Version
export const deleteVersion = ids => dispatch => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_URL}/models/${ids.modelId}/versions/${ids.versionId}`
    )
    .then(() => {
      axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/versions/${ids.versionId}`
        )
        .then(res =>
          dispatch({
            type: DELETE_VERSION,
            payload: ids.versionId
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
};
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Set loading state
export const setVersionLoading = () => {
  return {
    type: VERSION_LOADING
  };
};
