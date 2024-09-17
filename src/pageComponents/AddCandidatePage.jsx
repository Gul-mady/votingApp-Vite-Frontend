import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCandidatePage = () => {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    
    try {
      await axios.post('http://localhost:4000/candidate/candidates', {
        name,
        party,
        age
      }, {
        headers: {
          'x-access-token': token
        }
      });
      navigate('/qualified-candidates');
    } catch (error) {
      setError('Failed to add candidate.');
      console.error('Failed to add candidate', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#eeeeee]">
      <div className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl mb-6 text-[#eeeeee]">Add Candidate</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#eeeeee] mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-[#cccccc] rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#eeeeee] mb-2" htmlFor="party">Party</label>
            <input
              type="text"
              id="party"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              className="w-full px-4 py-2 border border-[#cccccc] rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#eeeeee] mb-2" htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-[#cccccc] rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#73659e] hover:bg-[#a91d3a] text-[#eeeeee] py-2 px-4 rounded transition-colors duration-300"
          >
            Add Candidate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidatePage;
