import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const handleLogout = () => {
      setCookies("access_token","")
      window.localStorage.removeItem("userID")
      navigate("/auth")
  }
  return (
    <nav className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white font-semibold hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/create-recipe"
              className="text-white font-semibold hover:text-gray-200"
            >
              Create Recipe
            </Link>
          </li>
          <li>
            <Link
              to="/saved-recipes"
              className="text-white font-semibold hover:text-gray-200"
            >
              Saved Recipes
            </Link>
          </li>
        </ul>
        <div>
          {!cookies.access_token ? (
            <Link
              to="/auth"
              className="text-white font-semibold hover:text-gray-200"
            >
              Login/Register
            </Link>
          ) : (
            <button  onClick={handleLogout} className="bg-transparent backdrop-blur-md text-white font-bold py-2 px-4 rounded-full border border-white hover:bg-white hover:text-purple-500 transition duration-300">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
