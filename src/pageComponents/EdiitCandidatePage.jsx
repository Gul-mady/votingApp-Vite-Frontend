import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const EditCandidatePage = () => {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  // const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    party: '',
  });

  useEffect(() => {
    const fetchCandidate = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          alert('No token found. Please log in again.');
          navigate('/login');
          return;
        }

        const response = await axios.get(`https://voting-app-x15.vercel.app/candidate/getCandidates`, {
          headers: {
            'x-access-token': token
          }
        });
        // setCandidate(response.data);
        setFormData({
          name: response.data.name,
          party: response.data.party,
        });

      } catch (error) {
        setError('Error fetching candidate data');
        console.error('Error fetching candidate data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        alert('No token found. Please log in again.');
        navigate('/login');
        return;
      }

      await axios.put(`https://voting-app-x15.vercel.app/candidate/${candidateId}`, formData, {
        headers: {
          'x-access-token': token
        }
      });

      alert('Candidate updated successfully');
      navigate('/registered-parties');

    } catch (error) {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError('An error occurred while updating. Please try again.');
      }
    }
  };

  if (loading) return <p className="text-[#eeeeee] text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#151515] text-[#eeeeee]">
      <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg max-w-md w-full transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#73659e]">Edit Candidate</h1>
        <h2 className="text-xl font-semibold text-center mb-4">Candidate Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#eeeeee] text-sm font-medium mb-2">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-[#2e2e2e] text-[#eeeeee] border border-[#73659e] rounded-lg transition-all duration-300 focus:outline-none focus:border-[#73659e] focus:ring-2 focus:ring-[#73659e]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="party" className="block text-[#eeeeee] text-sm font-medium mb-2">Party</label>
            <input
              id="party"
              name="party"
              type="text"
              value={formData.party}
              onChange={handleChange}
              className="w-full p-2 bg-[#2e2e2e] text-[#eeeeee] border border-[#73659e] rounded-lg transition-all duration-300 focus:outline-none focus:border-[#73659e] focus:ring-2 focus:ring-[#73659e]"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button 
              text="Update" 
              type="submit" 
              className="bg-[#73659e] hover:bg-[#a91d3a] text-[#eeeeee] py-2 px-4 rounded-lg transition-colors duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCandidatePage;
