import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from "./routes/users.js";
import { userModel } from "./models/userModel.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config();

const PORT = process.env.PORT;
const mongodbURI = process.env.mongodbURI;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/auth", userRouter)
app.use("/recipes",recipesRouter)

// Mongoose connection
mongoose
  .connect(mongodbURI)
  .then(() => {
    console.log('Connected to database');

    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
