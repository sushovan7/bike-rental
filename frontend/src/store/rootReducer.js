import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import favouriteReducer from "../features/favouriteSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  favourite: favouriteReducer,
});

export default rootReducer;
