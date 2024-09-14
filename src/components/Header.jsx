import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close the menu and navigate to the specified path
  const handleNavigation = (path) => {
    setIsMenuOpen(false); // Close the menu
    navigate(path); // Navigate to the specified path
  };

  return (
    <header className="bg-[#151515] text-[#eeeeee] p-4 shadow-md sticky top-0 w-full z-50">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo or App Title */}
        <Link to="/" className="text-2xl font-bold hover:text-[#a91d3a] transition-colors duration-300">
          Voting App
        </Link>
        
        {/* Toggle Button for Small Screens */}
        <button
          className="md:hidden text-[#eeeeee] p-2 rounded hover:bg-[#a91d3a] focus:outline-none transition-transform duration-300"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Menu for Large Screens */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="hover:text-[#a91d3a] transition-colors duration-300">Login</Link>
          <Link to="/register" className="hover:text-[#a91d3a] transition-colors duration-300">Sign Up</Link>
          <Link to="/dashboard" className="hover:text-[#a91d3a] transition-colors duration-300">Dashboard</Link>
          <Link to="/profile" className="hover:text-[#a91d3a] transition-colors duration-300">Profile</Link>
          <Link to="/candidates" className="hover:text-[#a91d3a] transition-colors duration-300">Candidates</Link>
        </div>
      </nav>

      {/* Responsive Navigation Menu for Small Screens */}
      <nav className={`fixed top-0 right-0 w-3/4 md:w-1/2 h-full bg-[#151515] bg-opacity-80 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-[#a91d3a]">
          <div className="text-[#eeeeee] text-xl font-semibold">Voting App</div>
          <button
            className="text-[#eeeeee] p-2 rounded hover:bg-[#a91d3a] focus:outline-none"
            onClick={toggleMenu}
          >
            <FaTimes size={24} />
          </button>
        </div>
        <ul className="flex flex-col items-center mt-4 space-y-4">
          <li>
            <button
              onClick={() => handleNavigation('/login')}
              className="text-[#eeeeee] text-xl hover:bg-[#a91d3a] py-2 px-4 rounded transition-colors"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/register')}
              className="text-[#eeeeee] text-xl hover:bg-[#a91d3a] py-2 px-4 rounded transition-colors"
            >
              Sign Up
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/dashboard')}
              className="text-[#eeeeee] text-xl hover:bg-[#a91d3a] py-2 px-4 rounded transition-colors"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/profile')}
              className="text-[#eeeeee] text-xl hover:bg-[#a91d3a] py-2 px-4 rounded transition-colors"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/candidates')}
              className="text-[#eeeeee] text-xl hover:bg-[#a91d3a] py-2 px-4 rounded transition-colors"
            >
              Candidates
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
