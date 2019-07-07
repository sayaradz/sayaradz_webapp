import {
  ADD_OPTION,
  UPDATE_OPTION,
  GET_OPTIONS,
  GET_OPTION,
  DELETE_OPTION,
  OPTION_LOADING
} from "../actions/types";
import {
  //NotificationContainer,
  NotificationManager
} from "react-notifications";

const initialState = {
  options: [],
  option: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPTION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_OPTIONS:
      return {
        ...state,
        options: action.payload,
        loading: false
      };
    case GET_OPTION:
      return {
        ...state,
        option: action.payload,
        loading: false
      };
    case UPDATE_OPTION:
      NotificationManager.success(
        "Mise à jour éffectuée avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        options: [
          ...state.options.map(b => {
            if (b._id === action.payload._id) return action.payload;
            else return b;
          })
          // action.payload,
          // ...state.brands.filter(brand => brand._id !== action.payload._id)
        ]
      };
    case ADD_OPTION:
      NotificationManager.success("Ajout éffectué avec succés", "Ajout");
      return {
        ...state,
        options: [action.payload, ...state.options]
      };
    case DELETE_OPTION:
      NotificationManager.success(
        "Suppression éffectuée avec succés",
        "Suppression"
      );
      return {
        ...state,
        options: state.options.filter(c => c._id !== action.payload)
      };
    default:
      return state;
  }
}
