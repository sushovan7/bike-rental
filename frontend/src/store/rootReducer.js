import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import favouriteReducer from "../features/favouriteSlice";
import notificationReducer from "../features/notificationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  favourite: favouriteReducer,
  notification: notificationReducer,
});

export default rootReducer;
