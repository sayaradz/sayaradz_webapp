import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import fabricantReducer from './fabricantReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  fabricant: fabricantReducer
});
