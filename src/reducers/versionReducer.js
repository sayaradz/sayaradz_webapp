import {
  ADD_VERSION,
  VERSION_LOADING,
  GET_VERSIONS,
  UPDATE_VERSION,
  DELETE_VERSION,
  GET_VERSION,
  CLEAR_ERRORS,
  GET_ERRORS
} from "../actions/types";
import {
  //NotificationContainer,
  NotificationManager
} from "react-notifications";

const initialState = {
  versions: [],
  completeVersions: [],
  version: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VERSION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_VERSIONS:
      return {
        ...state,
        versions: action.payload,
        completeVersions: action.payload.map(v => ({
          _id: v._id,
          colors: [],
          options: []
        })),
        loading: false
      };
    case GET_VERSION:
      return {
        ...state,
        version: action.payload,
        completeVersions: [
          ...state.completeVersions.map(v => {
            if (v._id === action.payload._id) return action.payload;
            else return v;
          })
        ],
        loading: false
      };
    case UPDATE_VERSION:
      NotificationManager.success(
        "Mise à jour éffectuée avec succés",
        "Mise à jour"
      );
      return {
        ...state,
        versions: [
          ...state.versions.map(b => {
            if (b._id === action.payload._id) return action.payload;
            else return b;
          })
        ]
      };
    case ADD_VERSION:
      NotificationManager.success("Ajout éffectué avec succés", "Ajout");
      return {
        ...state,
        versions: [action.payload.version, ...state.versions]
      };
    case DELETE_VERSION:
      NotificationManager.success(
        "Suppression éffectuée avec succés",
        "Suppression"
      );
      return {
        ...state,
        versions: state.versions.filter(c => c._id !== action.payload)
      };
    default:
      return state;
  }
}
