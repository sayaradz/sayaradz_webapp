import axios from "axios";

import {
  GET_VEHICLES_BY_MANUFACTURER,
  ADD_VEHICLE,
  GET_ERRORS,
  CLEAR_ERRORS,
  USER_LOADING
} from "./types";

let models = {
  "5d6593421f23cc0017cb7281": "Picanto",
  "5d177c20f222b900176c7284": "Golf 7"
};
let versions = {
  "5d04090a7f58fa00173774d5": "Line",
  "5d0409107f58fa00173774d6": "ACTIVE",
  "5d28c811603f200017b7d1c8": "R line"
};

const getData = data => {
  return data.map(d => ({
    ...d,
    model: models[d.model],
    version: versions[d.version]
  }));
};

// Add Vehicle
export const addVehicle = vehicleData => dispatch => {
  dispatch(clearErrors());
  setTimeout(() => {
    dispatch({
      type: ADD_VEHICLE,
      payload: getData(vehicleData)
    });
  }, 1000);
  // let result = [];
  // Promise.all(
  //   vehicleData.map(vd =>
  //     axios
  //       .post(`${process.env.REACT_APP_BACKEND_URL}/vehicles`, vd)
  //       .then(res => {
  //         result = [...result, res.data];
  //       })
  //   )
  // )
  //   .then(res => {
  //     dispatch({
  //       type: ADD_VEHICLE,
  //       payload: result
  //     });
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data
  //     });
  //   });
};

// Get Fabricant
export const getVehiclesByManufacturer = fabID => dispatch => {
  // console.log(fabID);
  dispatch(setFabricantLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/manufacturers/${fabID}/vehicles`)
    .then(res =>
      dispatch({
        type: GET_VEHICLES_BY_MANUFACTURER,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err.response.data);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set loading state
export const setFabricantLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
