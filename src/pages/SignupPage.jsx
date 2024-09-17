import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [identityCardNumber, setIdentityCardNumber] = useState('');
  const [file, setFile] = useState(null);
  const [role, setRole] = useState('voter'); // Default role is 'voter'
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('age', age);
    formData.append('mobile', mobile);
    formData.append('address', address);
    formData.append('identityCardNumber', identityCardNumber);
    formData.append('role', role); // Append role to FormData
    if (file) {
      formData.append('profilePicture', file);
    }

    try {
      await axios.post('https://voting-app-x15.vercel.app/user/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/login');
    } catch (error) {
      console.error('Signup failed', error);
      alert('Signup failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] p-4">
      <h2 className="text-2xl font-extrabold text-[#73659e] mb-4 text-center">Create Your Account</h2>
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl bg-[#1e1e1e]">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#2c2c2c] md:block hidden">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAETCAMAAABDSmfhAAAAA1BMVEX7kzxr6AS1AAAASElEQVR4nO3BgQAAAADDoPlT3+AEVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8A8WoAAHxScUAAAAAAElFTkSuQmCC"
            alt="Sign Up Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 bg-[#1e1e1e]">
          <form onSubmit={handleSignUp} className="w-full max-w-md space-y-4 bg-[#2e2e2e] p-4 rounded-lg shadow-lg">
            <div className="flex flex-col mb-4">
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:bg-[#2e2e2e] file:text-white hover:file:bg-[#4a4a4a] transition"
                // onChange={(e) => setFile(e.target.files[0])}
              />
              <span className="text-[#ffffff] text-sm mt-2">Add Profile Picture</span>
            </div>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="p-2 text-lg border border-[#4a4a4a] rounded bg-[#2e2e2e] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#73659e] transition duration-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 text-lg border border-[#4a4a4a] rounded bg-[#2e2e2e] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#73659e] transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Age"
                className="p-2 text-lg border border-[#4a4a4a] rounded bg-[#2e2e2e] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#73659e] transition duration-300"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Address"
                className="p-2 text-lg border border-[#4a4a4a] rounded bg-[#2e2e2e] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#73659e] transition duration-300"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Mobile No."
                className="p-2 text-lg border border-[#4a4a4a] rounded bg-[#2e2e2e] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#73659e] transition duration-300"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <input
                type="text"
                placeholder="Identity Card Number"
                className="p-2 text-lg border border-[#4a4a4a] rounded bg-[#2e2e2e] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#73659e] transition duration-300"
                value={identityCardNumber}
                onChange={(e) => setIdentityCardNumber(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 text-lg border border-[#4a4a4a] rounded bg-[#2e2e2e] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#73659e] transition duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Re-enter Password"
                className="p-2 text-lg border border-[#4a4a4a] rounded bg-[#2e2e2e] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#73659e] transition duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Role Selection */}
              <div className="flex flex-col space-y-2 mt-4">
                <label className="text-[#ffffff]">
                  <input
                    type="radio"
                    name="role"
                    value="voter"
                    checked={role === 'voter'}
                    onChange={() => setRole('voter')}
                    className="mr-2"
                  />
                  Voter
                </label>
                <label className="text-[#ffffff]">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                    className="mr-2"
                  />
                  Admin
                </label>
              </div>
            </div>

            <Button
              text="Sign Up"
              className="w-full py-2 bg-[#73659e] text-[#ffffff] font-bold rounded-lg transition duration-300 hover:bg-[#a91d3a] shadow-lg hover:shadow-xl mt-4"
            />
          </form>
          <div className="mt-4 text-center">
            <p className="text-[#cccccc]">Already have an account? <a href="/login" className="text-[#73659e] hover:underline">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
