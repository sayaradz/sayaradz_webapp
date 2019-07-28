import {
  GET_FABRICANT_USERS,
  DELETE_FABRICANT_USER,
  ADD_FABRICANT_USER,
  UPDATE_FABRICANT_USER,
  USER_LOADING
} from "../actions/types";
import { NotificationManager } from "react-notifications";

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
      NotificationManager.success(
        "Suppression éffectuée avec succés",
        "Suppression"
      );
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    case UPDATE_FABRICANT_USER:
      NotificationManager.success(
        "Mise à jour éffectuée avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        users: [
          action.payload,
          ...state.users.filter(user => user._id !== action.payload._id)
        ]
      };
    case ADD_FABRICANT_USER:
      NotificationManager.success("Ajout éffectué avec succés", "Ajout");
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
