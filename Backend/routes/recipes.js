import express from "express";
import mongoose from "mongoose";
import { userModel } from "../models/userModel.js";
import { recipeModel } from "../models/recipeModel.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await recipeModel.find({});
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const newRecipe = req.body;
  try {
    const createdRecipe = await recipeModel.create(newRecipe);
    res.status(201).json(createdRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.body.recipeID);
    const user = await userModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userID);
    const savedRecipes = await recipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export { router as recipesRouter };
