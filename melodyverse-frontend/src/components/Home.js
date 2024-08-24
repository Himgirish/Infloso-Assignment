import React from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-800 text-white">
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 bg-opacity-50">
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <FaMusic className="text-3xl" />
          <span>Melodyverse</span>
        </Link>
        <div className="space-x-4">
          <Link to="/signup" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors duration-300">
            <FaUserPlus className="inline mr-1" /> Sign Up
          </Link>
          <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors duration-300">
            <FaSignInAlt className="inline mr-1" /> Login
          </Link>
        </div>
      </nav>
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-5xl font-extrabold mb-4 text-center">
          Welcome to <span className="text-yellow-300">Melodyverse</span>
        </h1>
        <p className="text-lg mb-8 text-center">
          Explore the symphony of the universe with our melodic experiences. Sign up or log in to start your journey!
        </p>
      </div>
    </div>
  );
};

export default Home;
