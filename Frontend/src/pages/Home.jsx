import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useCookies } from "react-cookie";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();

  useEffect(() => {
    console.log("userID:", userID); // Logging userID to verify its value

    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        setRecipes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        if (!userID) {
          console.error("userID is undefined or invalid. Cannot fetch saved recipes.");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();

    if (userID) {
      fetchSavedRecipes();
    }
  }, [userID]);

  const handleSaveRecipe = async (recipeID) => {
    if (!userID) {
      console.error("userID is undefined or invalid. Cannot save recipe.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => {
    return savedRecipes.includes(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {isRecipeSaved(recipe._id) && (
              <h1 className="text-red-500 font-bold">ALREADY SAVED</h1>
            )}
            <img
              className="w-full h-48 object-cover"
              src={recipe.imageURL}
              alt={recipe.name}
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{recipe.name}</h2>
                <button
                  disabled={isRecipeSaved(recipe._id)}
                  onClick={() => handleSaveRecipe(recipe._id)}
                  className={`${
                    isRecipeSaved(recipe._id)
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-bold py-1 px-2 rounded text-sm`}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
              <p className="text-gray-700 mb-4">{recipe.instructions}</p>
              <p className="text-gray-500">
                Cooking Time: {recipe.cookingTime} minutes
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
