import React, { useState } from "react";
import { fetchRecipes, fetchRecipesByIngredients } from "../api/services";
import { useDispatch } from "react-redux";
import { setCategory, setRecipes, setSearchQuery } from "../redux/recipeSlice";
import { Select } from "antd";

const SearchBar = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [page] = useState(10);
  const [searchType, setSearchType] = useState("recipe");
  const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  const handleSearchClick = async () => {
    dispatch(setCategory(searchType));
    dispatch(setSearchQuery(query));
    let result;
    searchType === "recipe"
      ? (result = await fetchRecipes(query, page))
      : (result = await fetchRecipesByIngredients(query, page));
    const outputObject = { results: result };
    dispatch(setRecipes(outputObject));
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setSearchButtonDisabled(inputValue.trim() === ""); // Disable if query is empty or only contains whitespace
  };

  return (
    <div className="relative">
      <div className="flex items-center md:space-x-4 space-x-1.5 ">
        <Select
          defaultValue="recipe"
          className="h-[39px] w-24 md:w-[120px]"
          onChange={(e) => setSearchType(e)}
          options={[
            { value: "recipe", label: "Recipe" },
            { value: "ingredient", label: "Ingredient" },
          ]}
        />

        <div
          className={`relative border ${
            isInputFocused ? "border-blue-500" : "border-gray-300"
          } rounded-md flex items-center  w-[200px] md:w-max m-0`}
        >
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
            placeholder={`Search ${
              searchType === "recipe" ? "dishes" : "Ingredients"
            }...`}
            className="flex-grow focus:outline-none text-black p-2 w-60 min-w-0 rounded-tl rounded-bl text-sm"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <button
            onClick={handleSearchClick}
            className={`bg-white text-sm text-black px-4 py-2 rounded-tr rounded-br focus:outline-none border border-[#5051f9] ${
              searchButtonDisabled ? " cursor-not-allowed" : ""
            }`}
            disabled={searchButtonDisabled}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
