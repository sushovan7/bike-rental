import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("userInfo");
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
