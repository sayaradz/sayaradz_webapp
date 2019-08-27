import {
  ADD_VERSION,
  ADD_MODEL,
  GET_MODELS,
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
  brand: {}
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
        models: action.payload,
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
          action.payload,
          ...state.models.filter(model => model._id !== action.payload._id)
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
