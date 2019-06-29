import axios from "axios";

import {
  ADD_VERSION,
  CLEAR_ERRORS,
} from "./types";

// Add Versions
export const addVersion = versionData => dispatch => {
  dispatch(clearErrors());
  console.log(versionData)
  axios.
  post(`${process.env.REACT_APP_BACKEND_URL}/versions`, versionData.version)
    .then(res => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/models/${versionData.modelId}/versions`,
          {version_id: res.data._id}
          )
        .then(res => {
          console.log(res);
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

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
