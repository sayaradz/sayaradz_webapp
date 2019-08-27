import {
  ADD_VERSION,
  ADD_MODEL,
  GET_MODELS,
  GET_FAB_BRANDS,
  GET_MODEL,
  UPDATE_MODEL,
  MODEL_LOADING,
  DELETE_MODEL,
  SET_CURRENT_MODEL
} from "../actions/types";
import {
  //NotificationContainer,
  NotificationManager
} from "react-notifications";

const initialState = {
  models: [],
  model: {},
  current_model: {},
  loading: false,
  brands: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MODEL_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MODELS:
      return {
        ...state,
        models: state.models.filter(m => m._id === action.payload._id).length
          ? state.models
          : [action.payload, ...state.models],
        loading: false
      };
    case GET_FAB_BRANDS:
      return {
        ...state,
        brands: action.payload,
        loading: false
      };
    case GET_MODEL:
      return {
        ...state,
        model: action.payload,
        loading: false
      };
    case SET_CURRENT_MODEL:
      return {
        ...state,
        current_model: action.payload
      };
    case UPDATE_MODEL:
      NotificationManager.success(
        "Mise à jour éffectuée avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        models: [
          ...state.models.map(b => {
            if (b._id === action.payload._id) return action.payload;
            else return b;
          })
        ]
      };
    case ADD_MODEL:
      NotificationManager.success("Ajout éffectué avec succés", "Ajout");
      return {
        ...state,
        models: [action.payload, ...state.models]
      };
    case ADD_VERSION:
      NotificationManager.success("Ajout éffectué avec succés", "Ajout");
      return {
        ...state,
        current_model: action.payload
      };
    case DELETE_MODEL:
      NotificationManager.success(
        "Suppression éffectuée avec succés",
        "Suppression"
      );
      return {
        ...state,
        models: state.models.filter(model => model._id !== action.payload)
      };
    default:
      return state;
  }
}
