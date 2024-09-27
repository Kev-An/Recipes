import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Auth from "./pages/auth.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import SavedRecipes from "./pages/SavedRecipes.jsx";
import Navbar from './components/Navbar';
import "./index.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
