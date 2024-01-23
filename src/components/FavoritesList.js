// src/components/FavoritesList.js
import React from "react";
import { useSelector } from "react-redux";
import RecipeList from "./RecipeList";

const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div>
      {favorites.length === 0 ? (
        <p className="text-black-500 m-4">No favorites yet.</p>
      ) : (
        <RecipeList recipes={favorites} isFavPage={true} />
      )}
    </div>
  );
};

export default FavoritesList;
