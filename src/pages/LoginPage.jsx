import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const LoginPage = () => {
  const [identityCardNumber, setIdentityCardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(''); // Added error state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting login process
    setError(''); // Reset error

    try {
      const response = await axios.post('https://voting-app-x15.vercel.app/user/login', {
        identityCardNumber,
        password
      });

      // Ensure response contains the token
      if (response.data && response.data.token) {
        // Save token to localStorage
        localStorage.setItem('jwtToken', response.data.token);
        navigate('/candidates'); // Redirect after successful login
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed: ' + (error.response?.data?.message || error.message)); // Display error message
    } finally {
      setLoading(false); // Set loading to false after login process
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#151515]">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between md:space-x-8 p-6 md:p-12 bg-[#1e1e1e] text-[#eeeeee] rounded-lg shadow-lg">

        {/* Illustration Section */}
        <div className="flex-1 flex justify-center md:block hidden mb-8 md:mb-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvLx3xYlEttJhirLSTziavuWpXv9WmWh9X7A&s" // Replace with the actual path to your illustration image
            alt="Login Illustration"
            className="w-full max-w-xs md:max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 max-w-md w-full bg-[#2e2e2e] p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-[#eeeeee] mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              placeholder="Identity Card Number"
              className="w-full p-4 text-lg border border-[#73659e] rounded bg-[#1e1e1e] text-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#73659e] transition duration-300"
              value={identityCardNumber}
              onChange={(e) => setIdentityCardNumber(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 text-lg border border-[#73659e] rounded bg-[#1e1e1e] text-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#73659e] transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error */}
            <div className="flex flex-col md:flex-row justify-between items-center text-sm">
              <Link to="/forgot-password" className="text-[#73659e] hover:underline mb-2 md:mb-0">Forgot Password?</Link>
              <Link to="/register" className="text-[#73659e] hover:underline">Register now</Link>
            </div>
            <Button 
              text={loading ? "Logging in..." : "Login"} // Change button text when loading
              className="w-full py-3 bg-[#73659e] text-[#eeeeee] font-bold rounded transition duration-300 hover:bg-[#a91d3a]" 
              disabled={loading} // Disable button while loading
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
