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
export const addVersion = versionData => dispatch => {
  dispatch(clearErrors());
  dispatch({
    type: ADD_VERSION,
    payload: versionData
  });
};

// Add Version
export const addVersion0 = versionData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/versions`, versionData.version)
    .then(res => {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/models/${versionData.modelId}/versions`,
          { version_id: res.data._id }
        )
        .then(resu => {
          versionData.options
            .forEach(o => {
              axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/versions/${res.data._id}/options`,
                { option_id: o.value }
              );
            })
            .then(resul => {
              versionData.colors
                .forEach(o => {
                  axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/versions/${res.data._id}/colors`,
                    { color_id: o.value }
                  );
                })
                .then(res => {
                  axios
                    .get(
                      `${process.env.REACT_APP_BACKEND_URL}/models/${versionData.modelId}`
                    )
                    .then(res => {
                      dispatch({
                        type: ADD_VERSION,
                        payload: res.data
                      });
                    });
                });
            });
        });
    });
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
