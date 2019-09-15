import axios from "axios";

import {
  GET_MODELS,
  GET_FAB_BRANDS,
  GET_ERRORS,
  ADD_VERSION,
  ADD_MODEL,
  DELETE_MODEL,
  MODEL_LOADING,
  CLEAR_ERRORS,
  SET_CURRENT_MODEL,
  UPDATE_MODEL
} from "./types";

// Get Modeles
export const getModels = fabId => dispatch => {
  dispatch(setModelLoading());
  // manufacturer => get brands
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/manufacturers/${fabId}`)
    .then(res =>
      // brand => get models
      res.data.brands.forEach(b => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/brands/${b._id}`)
          .then(res =>
            res.data.models.forEach(m =>
              dispatch({
                type: GET_MODELS,
                payload: { brand: b, ...m }
              })
            )
          )
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: null
            })
          );
      })
    );
};

// Get Modele Brands
export const getFabBrands = fabId => dispatch => {
  dispatch(setModelLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/manufacturers/${fabId}`)
    .then(res => {
      dispatch({
        type: GET_FAB_BRANDS,
        payload: res.data.brands
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Add Model
export const addModel = (modelData, brandId) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/models`, modelData)
    .then(res => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/brands/${brandId}/models`, {
          model_id: res.data._id
        })
        .then(getFabBrands())
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/brands/${brandId}`)
        .then(result => {
          dispatch({
            type: ADD_MODEL,
            payload: { brand: result.data, ...res.data }
          });
        })
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
// Update Model
export const updateModel = (
  id,
  modelData,
  oldBrandId,
  newBrandId
) => dispatch => {
  dispatch(clearErrors());
  //if brand changed
  if (oldBrandId !== newBrandId) {
    //if model had a Brand delete the model from that Brand models list
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/brands/${oldBrandId}/models/${id}`
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );

    //Add the model to the new Brand models list
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/brands/${newBrandId}/models`,
        { model_id: id }
      )
      .then(() => {
        //Get brands list
        getFabBrands();
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
    .put(`${process.env.REACT_APP_BACKEND_URL}/models/${id}`, modelData)
    .then(res =>
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/brands/${newBrandId}`)
        .then(result => {
          dispatch({
            type: UPDATE_MODEL,
            payload: { brand: result.data, ...res.data }
          });
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        )
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
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/versions`, versionData.version)
    .then(res => {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/models/${versionData.modelId}/versions`,
          { version_id: res.data._id }
        )
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
};

// Delete Model
export const deleteModel = model => dispatch => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_URL}/brands/${model.brand._id}/models/${model._id}`
    )
    .then(() => {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/models/${model._id}`)
        .then(res =>
          dispatch({
            type: DELETE_MODEL,
            payload: model._id
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

export const setCurrentModel = modelId => dispatch => {
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/models/${modelId}`)
    .then(model => {
      dispatch({
        type: SET_CURRENT_MODEL,
        payload: model.data
      });
    });
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
