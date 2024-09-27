import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Saved Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {savedRecipes.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-48 object-cover" src={recipe.imageURL} alt={recipe.name} />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{recipe.name}</h2>
          
              </div>
              <p className="text-gray-700 mb-4">{recipe.instructions}</p>
              <p className="text-gray-500">Cooking Time: {recipe.cookingTime} minutes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;
