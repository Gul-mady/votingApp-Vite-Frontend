import React, { useState, useRef } from 'react';
import { FaLock, FaEthereum, FaCheck, FaHandPointer, FaDollarSign, FaClock, FaBars, FaTimes, FaRegListAlt, FaSignInAlt, FaTh, FaKey, FaCheckSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-[#151515] text-[#eeeeee]">
      {/* Header Section */}
      <header className="sticky top-0 flex justify-between items-center p-4 bg-[#151515] bg-opacity-60 backdrop-blur-md z-50 shadow-md transition-all ease-in-out duration-300">
        <div className="text-[#eeeeee] text-xl font-semibold">Voting App</div>
        {/* Toggle Button for Small Screens */}
        <button
          className="md:hidden text-[#eeeeee] p-2 rounded hover:bg-[#a91d3a] focus:outline-none transition-transform duration-300"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {/* Navigation Menu for Large Screens */}
        <nav className="hidden md:flex space-x-8">
          <button
            className="hover:bg-[#a91d3a] text-[#eeeeee] py-2 px-4 rounded transition-colors"
            onClick={() => scrollToSection(aboutRef)}
          >
            About
          </button>
          <button
            className="hover:bg-[#a91d3a] text-[#eeeeee] py-2 px-4 rounded transition-colors"
            onClick={() => scrollToSection(featuresRef)}
          >
            Features
          </button>
          <Link to="/login" className="bg-[#73659e] hover:bg-[#6e5b7d] text-[#eeeeee] py-2 px-4 rounded transition-colors">Login</Link>
        </nav>
      </header>

      {/* Responsive Navigation Menu for Small Screens */}
      <nav className={`fixed top-0 right-0 w-1/2 h-full bg-[#151515] bg-opacity-80 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-[#a91d3a]">
          <div className="text-[#eeeeee] text-xl font-semibold">Let's Vote</div>
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
              className="text-[#eeeeee] text-xl hover:bg-[#a91d3a] py-2 px-4 rounded transition-colors"
              onClick={() => scrollToSection(aboutRef)}
            >
              About
            </button>
          </li>
          <li>
            <button
              className="text-[#eeeeee] text-xl hover:bg-[#a91d3a] py-2 px-4 rounded transition-colors"
              onClick={() => scrollToSection(featuresRef)}
            >
              Features
            </button>
          </li>
          <li>
            <Link to="/login" className="bg-[#73659e] hover:bg-[#6e5b7d] text-[#eeeeee] py-2 px-4 rounded transition-colors">Login</Link>
          </li>
        </ul>
      </nav>

      {/* Main Banner Section */}
      <main className="flex flex-col md:flex-row items-center justify-between px-8 py-16">
        <img src="" alt="Let's Vote" className="w-full md:w-1/2 mb-8 md:mb-0 transition-transform transform hover:scale-105 duration-500" />
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold text-[#73659e] hover:text-[#6e5b7d] transition-colors duration-300">Be a part of decision</h2>
          <p className="text-3xl md:text-4xl font-semibold mt-4">Vote Today</p>
          <div className="mt-8 space-x-4">
            <Link to="/register" className="bg-[#73659e] hover:bg-[#6e5b7d] text-[#eeeeee] py-3 px-6 rounded text-lg transition-colors">Register</Link>
            <button
              className="bg-[#73659e] hover:bg-[#6e5b7d] text-[#eeeeee] py-3 px-6 rounded text-lg transition-colors"
              onClick={() => scrollToSection(featuresRef)}
            >
              Read More
            </button>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section ref={aboutRef} className="about-section px-8 py-16 bg-[#151515] text-[#eeeeee] transition-transform transform hover:scale-105 duration-500">
        <h2 className="text-4xl font-bold text-center text-[#73659e]">About</h2>
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-xl">
            An online voting system that will replace the old ballot system or paper system. 
            Over time we have utilized the required technology in every sector to improve 
            efficiency and save extra resources. But the voting system is still very expensive 
            and requires a bigger workforce. The system is slower and still not completely 
            tamper-proof. We bring a system that is safe, reliable, and solves modern issues 
            like higher reachability of the booth, crowd-free voting, inexpensive, faster results, and others.
          </p>
        </div>
      </section>

      {/* Follow Steps Section */}
      <section className="px-8 py-16 bg-[#151515] text-[#eeeeee] transition-transform transform hover:scale-105 duration-500">
        <h2 className="text-4xl font-bold text-center text-[#73659e] mb-12">Follow these easy steps</h2>
        <div className="max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center space-x-4">
            <FaRegListAlt className="text-3xl" />
            <span>Register yourself by filling the required informations</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaSignInAlt className="text-3xl" />
            <span>Sign in as user</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaTh className="text-3xl" />
            <span>Go to vote option on dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaKey className="text-3xl" />
            <span>Give security key</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaCheckSquare className="text-3xl" />
            <span>Vote your candidate and submit</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features-section px-8 py-16 bg-[#151515] text-[#eeeeee] transition-transform transform hover:scale-105 duration-500">
        <h2 className="text-4xl font-bold text-center text-[#73659e]">Features</h2>
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center space-x-4">
            <FaLock className="text-3xl" />
            <span>Secured by bcrypt encryption</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaEthereum className="text-3xl" />
            <span>Backed by NodeJs technology</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaCheck className="text-3xl" />
            <span>Verifiable transactions</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaHandPointer className="text-3xl" />
            <span>Easy to use</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaDollarSign className="text-3xl" />
            <span>Cheaper than the ballot voting system</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaClock className="text-3xl" />
            <span>Faster voting process</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
