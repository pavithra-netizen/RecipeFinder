import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    results: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.results.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      if (Array.isArray(state.results)) {
        state.results = state.results.filter(
          (fav) => fav.id !== action.payload.id
        );
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
