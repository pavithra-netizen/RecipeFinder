import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rightArrow from "../assert/images/arrow-right.png";
import removeFromFavIcon from "../assert/images/favourite.png";
import AddFavIcon from "../assert/images/not-favourite.png";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/favoritesSlice";
import Pagination from "./Pagination";
import { fetchRecipes, fetchRecipesByIngredients } from "../api/services";
import { setRecipes } from "../redux/recipeSlice";
import { Row, Col } from "antd";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeList = ({ recipes, isFavPage }) => {
  const [fadeStates, setFadeStates] = useState({});
  const [pageNo, setPageNo] = useState(1);
  const [page, setPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const favoriteRecipes = useSelector((state) => state.favorites.results);
  const searchType = useSelector((state) => state.recipe.category);
  const query = useSelector((state) => state.recipe.query);

  const dispatch = useDispatch();

  const getRecipes = async () => {
    try {
      const response = await fetchRecipes("", 10);
      const result = await response;
      const outputObject = { results: result };
      dispatch(setRecipes(outputObject));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getRecipes();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToFavorites = (item) => {
    dispatch(addToFavorites(item));
    setFadeStates((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setFadeStates((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const handleRemoveFromFavorites = (item) => {
    dispatch(removeFromFavorites(item));
    setFadeStates((prev) => ({ ...prev, [item.id]: false }));
  };

  const onPrevPageSelect = async () => {
    setPage((prevPage) => prevPage - 10);
    setPageNo((prev) => prev - 1);
    try {
      var result;
      searchType === "recipe"
        ? (result = await fetchRecipes(query, page - 10))
        : (result = await fetchRecipesByIngredients(query, page - 10));
      const outputObject = { results: result.slice(-10) };
      dispatch(setRecipes(outputObject));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleNextPage = async () => {
    setPage((prevPage) => prevPage + 10);
    setPageNo((prev) => prev + 1);
    try {
      var result;
      searchType === "recipe"
        ? (result = await fetchRecipes(query, page + 10))
        : (result = await fetchRecipesByIngredients(query, page + 10));
      const outputObject = { results: result.slice(-10) };
      dispatch(setRecipes(outputObject));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  return (
    <div className=" bg-[whitesmoke]">
      <>
        <ToastContainer />
      </>

      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            {recipes && recipes.results && recipes.results.length === 0 ? (
              <div className="text-center h-screen flex items-center justify-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">No recipes found!</h2>
                  <p className="text-gray-600">
                    It looks like there are no recipes matching your search. Try
                    searching for a different recipe!
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mt-8 md:mt-4  items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  xl:grid-cols-5  gap-6">
                  {recipes &&
                    recipes?.results &&
                    recipes?.results?.map((item, index) => (
                      <div key={index}>
                        <div
                          className={`border-1 bg-white border-gray-300 w-60 ${
                            fadeStates[item.id] ? "fade" : ""
                          }`}
                        >
                          <img
                            src={item?.image}
                            alt={item.title}
                            className=" w-60 h-40 rounded-tl rounded-tr"
                          />
                          <Row className="py-3 px-2">
                            <Col className="truncate w-[90%]" span={22}>
                              {" "}
                              <h1
                                title={item.title}
                                className="text-black m-2 truncate text-sm font-medium"
                              >
                                {item?.title}
                              </h1>{" "}
                            </Col>
                            <Col
                              span={2}
                              className="flex justify-center items-center"
                            >
                              {(favoriteRecipes || []).find &&
                              (favoriteRecipes || []).find(
                                (fav) => fav.id === item.id
                              ) ? (
                                <button
                                  onClick={() =>
                                    handleRemoveFromFavorites(item)
                                  }
                                >
                                  <img
                                    src={removeFromFavIcon}
                                    className="w-4 h-4 mr-4"
                                    alt="non-fav"
                                  />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleAddToFavorites(item)}
                                >
                                  <img
                                    src={AddFavIcon}
                                    className="w-4 h-4 mr-4"
                                    alt="fav"
                                  />
                                </button>
                              )}
                            </Col>
                          </Row>
                          <Link
                            to={`/recipe/${item?.id}`}
                            key={index}
                            className="cursor-pointer "
                          >
                            <div className="px-2 bg-[#5051f9]  flex items-center justify-between rounded-bl rounded-br py-3">
                              <p className="text-white ml-2 text-sm font-medium mb-0  ">
                                Read full Recipe
                              </p>
                              <img
                                src={rightArrow}
                                alt="logo"
                                className="w-4 h-4 mr-2"
                              />
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {!isFavPage && (
              <Pagination
                PageNo={pageNo}
                currentPage={page}
                onNextPageSelect={handleNextPage}
                onPrevPageSelect={onPrevPageSelect}
              />
            )}
          </>
        )}
      </>
    </div>
  );
};

export default RecipeList;
