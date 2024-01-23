import axios from "axios";
const api_key = "ea816602e7914a3c8d8aa559da32cde7";

export const fetchRecipes = async (defaultQuery, page) => {
  const options = {
    method: "GET",
    url: "https://api.spoonacular.com/recipes/complexSearch",
    params: {
      query: defaultQuery,
      apiKey: api_key,
      number: page,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchRecipesByIngredients = async (incredient, page) => {
  const options = {
    method: "GET",
    url: "https://api.spoonacular.com/recipes/findByIngredients",
    params: {
      ingredients: incredient,
      apiKey: api_key,
      number: page,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchRecipeDetails = async (id) => {
  const options = {
    method: "GET",
    url: `https://api.spoonacular.com/recipes/${id}/information`,
    params: {
      apiKey: api_key,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
