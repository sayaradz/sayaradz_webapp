import {
  ADD_USER,
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_LOADING
} from "../actions/types";
import { NotificationManager } from "react-notifications";

const initialState = {
  fabricants: [],
  fabricant: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        fabricants: action.payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        fabricant: action.payload,
        loading: false
      };
    case UPDATE_USER:
      NotificationManager.success(
        "Mise à jour éffectuée avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        fabricants: [
          ...state.fabricants.map(f => {
            if (f._id === action.payload._id) return action.payload;
            else return f;
          })

          // action.payload,
          // ...state.fabricants.filter(
          //   fabricant => fabricant._id !== action.payload._id
          // )
        ]
      };
    case ADD_USER:
      NotificationManager.success("Ajout éffectué avec succés", "Ajout");
      return {
        ...state,
        fabricants: [action.payload, ...state.fabricants]
      };
    case DELETE_USER:
      NotificationManager.success(
        "Suppression éffectuée avec succés",
        "Suppression"
      );
      return {
        ...state,
        fabricants: state.fabricants.filter(
          fabricant => fabricant._id !== action.payload
        )
      };
    default:
      return state;
  }
}
