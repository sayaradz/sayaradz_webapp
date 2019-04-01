import {GET_FABRICANT_USERS} from "../actions/types";

const initialState = {
  users: [],
  user: {},
  loading: false
};



export default  function (state = initialState, action) {
  switch (action.type) {
    case GET_FABRICANT_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };



    default:
      console.log("default");
      return state;
  }
}
