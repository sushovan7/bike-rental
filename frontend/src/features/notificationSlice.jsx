import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsData: JSON.parse(localStorage.getItem("favouriteData") || "[]"),
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationCount: (state, action) => {
      state.notificationsData = action.payload;
      localStorage.setItem(
        "favouriteData",
        JSON.stringify(state.notificationsData)
      );
    },
  },
});

export const { notificationCount } = notificationSlice.actions;
export default notificationSlice.reducer;
