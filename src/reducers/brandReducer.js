import {
  ADD_BRAND,
  GET_BRANDS,
  GET_BRAND,
  UPDATE_BRAND,
  DELETE_BRAND,
  BRAND_LOADING
} from "../actions/types";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

const initialState = {
  brands: [],
  brand: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BRAND_LOADING:
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
    case GET_BRAND:
      return {
        ...state,
        brand: action.payload,
        loading: false
      };
    case UPDATE_BRAND:
      NotificationManager.success(
        "Mise à jour éffectuée avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        brands: [
          action.payload,
          ...state.brands.filter(brand => brand._id !== action.payload._id)
        ]
      };
    case ADD_BRAND:
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
