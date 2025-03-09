import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteData: JSON.parse(localStorage.getItem("favouriteData") || "[]"),
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    createFavourite: (state, action) => {
      state.favouriteData.push(action.payload.favouriteData);
      localStorage.setItem(
        "favouriteData",
        JSON.stringify(state.favouriteData)
      );
    },
    removeFavourite: (state, action) => {
      state.favouriteData = state.favouriteData.filter(
        (item) => item.bikeId !== action.payload.productId
      );
      localStorage.setItem(
        "favouriteData",
        JSON.stringify(state.favouriteData)
      );
    },
  },
});

export const { createFavourite, removeFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
