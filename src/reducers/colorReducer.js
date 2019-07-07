import {
  ADD_COLOR,
  UPDATE_COLOR,
  GET_COLORS,
  GET_COLOR,
  DELETE_COLOR,
  COLOR_LOADING
} from "../actions/types";
import {
  //NotificationContainer,
  NotificationManager
} from "react-notifications";

const initialState = {
  colors: [],
  color: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COLOR_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COLORS:
      return {
        ...state,
        colors: action.payload,
        loading: false
      };
    case GET_COLOR:
      return {
        ...state,
        color: action.payload,
        loading: false
      };
    case UPDATE_COLOR:
      NotificationManager.success(
        "Mise à jour éffectuée avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        colors: [
          ...state.colors.map(b => {
            if (b._id === action.payload._id) return action.payload;
            else return b;
          })
          // action.payload,
          // ...state.brands.filter(brand => brand._id !== action.payload._id)
        ]
      };
    case ADD_COLOR:
      NotificationManager.success("Ajout éffectué avec succés", "Ajout");
      return {
        ...state,
        colors: [action.payload, ...state.colors]
      };
    case DELETE_COLOR:
      NotificationManager.success(
        "Suppression éffectuée avec succés",
        "Suppression"
      );
      return {
        ...state,
        colors: state.colors.filter(c => c._id !== action.payload)
      };
    default:
      return state;
  }
}
