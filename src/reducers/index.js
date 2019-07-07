import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import fabricantReducer from "./fabricantReducer";
import userReducer from "./userReducer";
import brandReducer from "./brandReducer";
import modelReducer from "./modelReducer";
import colorReducer from "./colorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  fabricant: fabricantReducer,
  user: userReducer,
  brand: brandReducer,
  color: colorReducer,
  model: modelReducer
});
