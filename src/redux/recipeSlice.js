import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    category: "recipe",
    query: "",
  },
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setRecipes, setSearchQuery, setCategory } = recipeSlice.actions;
export default recipeSlice.reducer;
