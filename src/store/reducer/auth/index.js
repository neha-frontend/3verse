import { combineReducers } from '@reduxjs/toolkit';
import { forgotPasswordReducer } from './forgotPasswordSlice';
import { authReducer } from './loginSlice';
import { registerReducer } from './registerSlice';

const authRootReducer = combineReducers({
  login: authReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer
});
export default authRootReducer;
