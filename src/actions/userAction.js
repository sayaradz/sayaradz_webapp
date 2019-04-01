import {GET_FABRICANT_USERS} from "./types";

// Get Users
export const getUsers = id => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => dispatch({
      type: GET_FABRICANT_USERS,
      payload: json
    }));
};
