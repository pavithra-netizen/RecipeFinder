import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import recipeReducer from "./recipeSlice";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    recipe: recipeReducer,
  },
});

export default store;
