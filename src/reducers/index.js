import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import fabricantReducer from "./fabricantReducer";
import userReducer from "./userReducer";
import brandReducer from "./brandReducer";
import modelReducer from "./modelReducer";
import versionReducer from "./versionReducer";
import colorReducer from "./colorReducer";
import optionReducer from "./optionReducer";
import orderReducer from "./orderReducer";
import allUsersReducer from "./allUsersReducer";
import vehicleReducer from "./vehicleReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  fabricant: fabricantReducer,
  user: userReducer,
  brand: brandReducer,
  color: colorReducer,
  option: optionReducer,
  model: modelReducer,
  version: versionReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  vehicle: vehicleReducer
});
