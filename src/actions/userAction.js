import {DELETE_FABRICANT_USER, DELETE_USER, GET_ERRORS, GET_FABRICANT_USERS} from "./types";

// Get Users
export const getUsers = id => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => dispatch({
      type: GET_FABRICANT_USERS,
      payload: json
    }));
};

// Delete User

export const deleteUser = id => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/users/${id}', {
    method: 'DELETE'
  })
    .then(res =>
      dispatch({
        type: DELETE_FABRICANT_USER,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
};
