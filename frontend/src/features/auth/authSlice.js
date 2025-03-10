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
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("userInfo");
    },
  },
});

export const { setToken, updateUser, logout } = authSlice.actions;

export default authSlice.reducer;
