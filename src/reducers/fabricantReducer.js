import {
  ADD_FABRICANT,
  UPDATE_FABRICANT,
  GET_FABRICANTS,
  GET_FABRICANT,
  DELETE_FABRICANT,
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
    case GET_FABRICANTS:
      return {
        ...state,
        fabricants: action.payload,
        loading: false
      };
    case GET_FABRICANT:
      return {
        ...state,
        fabricant: action.payload,
        loading: false
      };
    case UPDATE_FABRICANT:
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
        ]
      };
    case ADD_FABRICANT:
      NotificationManager.success("Ajout éffectué avec succés", "Ajout");
      return {
        ...state,
        fabricants: [action.payload, ...state.fabricants]
      };
    case DELETE_FABRICANT:
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
