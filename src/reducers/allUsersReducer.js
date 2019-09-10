import { NotificationManager } from "react-notifications";
import { GET_USERS, UPDATE_USER_STATUS, USER_LOADING } from "../actions/types";

const initialState = {
  allUsers: [],
  user: {}, // this might overlap with the manufacturers users
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
        loading: false
      };

    case UPDATE_USER_STATUS:
      NotificationManager.success(
        "Mise à jour éffectuée avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        allUsers: [
          ...state.allUsers.map(user => {
            if (user.id === action.payload.id) return action.payload;
            else return user;
          })
        ]
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
