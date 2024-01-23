import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import checklist from "../assert/images/approve.png";
import leftArrow from "../assert/images/left-arrow.png";
import { useParams } from "react-router-dom";
import { fetchRecipeDetails } from "../api/services";
import Loader from "./Loader";

const RecipeDetail = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const getTrueLabels = (recipeDetail) => {
    if (recipeDetail) {
      return Object?.entries(recipeDetail)
        .filter(([key, value]) => value === true)
        .map(([key]) => key);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const getReceipeDetail = async (id) => {
    setLoading(true);
    const details = await fetchRecipeDetails(id);
    setSelectedRecipe(details);
    setLoading(false);
  };
  useEffect(() => {
    getTrueLabels(selectedRecipe);
  }, [selectedRecipe]);
  useEffect(() => {
    getReceipeDetail(id);
  }, [id]);

  return (
    <div className="md:flex inline-flex justify-center w-[100%] h-[100%]  p-4 bg-[whitesmoke]">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex mt-[15px] md:mt-[0px]" onClick={handleGoBack}>
            <img src={leftArrow} className="w-4 h-4 m-2" alt="goback" />
            <button className="text-black text-base font-bold cursor-pointer">
              Go back
            </button>
          </div>
          <h2 className="text-black m-2 text-xl font-bold">
            {selectedRecipe.title}
          </h2>
          <div className="border-t border-gray-300 h-0 m-2"></div>
          <div className="flex flex-col md:flex-row">
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="w-full md:w-1/3 h-[200px] md:h-[inherit] rounded mb-4 md:mb-0"
            />
            <div className="md:w-2/3 md:pl-4">
              <p className="text-gray-600 m-2 text-base font-bold">
                Health label
              </p>
              <div className="flex flex-wrap">
                {getTrueLabels(selectedRecipe).map((label, index) => (
                  <div
                    key={index}
                    className="bg-[#5051f9] rounded-full m-1 p-2"
                  >
                    <p className="text-white text-sm px-2 mb-0 font-medium ">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <h3 className="text-gray-600 m-2 text-base font-bold">
                Ingredients:
              </h3>
              <div className="flex flex-wrap m-2">
                {selectedRecipe &&
                  selectedRecipe?.extendedIngredients &&
                  selectedRecipe?.extendedIngredients.map(
                    (ingredient, index) => (
                      <div
                        className="flex items-center py-2 md:py-3 pr-2 md:pr-5 w-full md:w-1/2"
                        key={index}
                      >
                        <img
                          src={checklist}
                          className="w-4 h-4 mr-2"
                          alt="checklist"
                        />
                        <p
                          className="text-black text-sm font-medium mb-0 flex items-center h-10 md:h-4"
                          key={index}
                        >
                          {ingredient.original}
                        </p>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-gray-600 m-2 text-base font-bold">
              Instructions:
            </h3>
            <div
              className="text-black m-2 text-sm leading-7"
              dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
