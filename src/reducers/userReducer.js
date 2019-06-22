import {
  GET_FABRICANT_USERS,
  DELETE_FABRICANT_USER,
  USER_LOADING,
  UPDATE_USER,
  ADD_USER
} from "../actions/types";

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
    case UPDATE_USER:
      return {
        ...state,
        users: [
          action.payload,
          ...state.users.filter(user => user._id !== action.payload._id)
        ]
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
