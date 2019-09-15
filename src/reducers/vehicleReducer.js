import { NotificationManager } from "react-notifications";
import {
  GET_VEHICLES_BY_MANUFACTURER,
  ADD_VEHICLE,
  USER_LOADING
} from "../actions/types";

const initialState = {
  vehicles: [],
  vehicle: {},
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VEHICLES_BY_MANUFACTURER:
      return {
        ...state,
        vehicles: action.payload,
        loading: false
      };

    case ADD_VEHICLE:
      console.log(action.payload);
      NotificationManager.success("Stock éffectué avec succés", "Stock");
      return {
        ...state,
        vehicles: [...action.payload, ...state.vehicles],
        loading: false
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
