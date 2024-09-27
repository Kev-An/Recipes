import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const CreateRecipe = () => {
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const [cookies, _] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleeIngredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Submitting recipe:", recipe); // Add this line to log the recipe object
  
    try {
      const response = await axios.post(
        "http://localhost:5000/recipes",
        recipe,
        {
          headers: {
            authorization: cookies.access_token, // Ensure the token is included in the headers
          },
        }
      );
      alert("Recipe created");
      navigate("/");
    } catch (error) {
      console.error("Error creating recipe:", error.response.data); // Update this line to log the error response
      alert("Failed to create recipe");
    }
  };
  

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a Recipe!</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="description"
            id="description"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700"
          >
            Ingredients:
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(e) => handleeIngredientChange(e, index)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ))}
          <button onClick={addIngredient} type="button">
            Add ingredients
          </button>
        </div>
        <div>
          <label
            htmlFor="instructions"
            className="block text-sm font-medium text-gray-700"
          >
            Instructions:
          </label>
          <textarea
            onChange={handleChange}
            name="instructions"
            id="instructions"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="imageURL"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL:
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="imageURL"
            id="imageURL"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="cookingTime"
            className="block text-sm font-medium text-gray-700"
          >
            Cooking Time (in Minutes):
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="cookingTime"
            id="cookingTime"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Recipe!
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
