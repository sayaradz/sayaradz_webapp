import { GET_FABRICANT_USERS, DELETE_FABRICANT_USER } from "../actions/types";

const initialState = {
  users: [],
  user: {},
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FABRICANT_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case DELETE_FABRICANT_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };

    default:
      return state;
  }
}
