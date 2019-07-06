import {
  ADD_VERSION,
  GET_BRANDS,
  GET_MODEL,
  UPDATE_MODEL,
  DELETE_BRAND,
  MODEL_LOADING
} from "../actions/types";
import {
  //NotificationContainer,
  NotificationManager
} from "react-notifications";

const initialState = {
  brands: [],
  brand: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MODEL_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload,
        loading: false
      };
    case GET_MODEL:
      return {
        ...state,
        brand: action.payload,
        loading: false
      };
    case UPDATE_MODEL:
      NotificationManager.success(
        "Mise à jour éffectuée avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        brands: [
          ...state.brands.map(b => {
            if (b._id === action.payload._id) return action.payload;
            else return b;
          })
          // action.payload,
          // ...state.brands.filter(brand => brand._id !== action.payload._id)
        ]
      };
    case ADD_VERSION:
      NotificationManager.success("Ajout éffectué avec succés", "Ajout");
      return {
        ...state,
        brands: [action.payload, ...state.brands]
      };
    case DELETE_BRAND:
      NotificationManager.success(
        "Suppression éffectuée avec succés",
        "Suppression"
      );
      return {
        ...state,
        brands: state.brands.filter(brand => brand._id !== action.payload)
      };
    default:
      return state;
  }
}
