import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';

const QualifiedCandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState({ name: '', profilePicture: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Decode the token to get user info
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        if (!userId) {
          throw new Error('User ID is undefined');
        }

        // Verify the token by fetching the user profile
        const profileResponse = await fetch(`https://voting-app-x15.vercel.app/user/profile/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!profileResponse.ok) {
          throw new Error('Role verification failed');
        }

        const profileData = await profileResponse.json();

        // Check user role
        if (profileData.role === 'admin') {
          setIsAdmin(true);
          setAdminData({
            name: profileData.name,
            profilePicture: profileData.profilePicture
          });
          await fetchCandidates(token); // Pass token to fetchCandidates
        } else {
          navigate('/403');
        }
      } catch (error) {
        console.error('Error verifying token or role', error);
        setError('Verification failed. Please login again.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    const fetchCandidates = async (token) => {
      try {
        const response = await axios.get('https://voting-app-x15.vercel.app/candidate/getCandidates', {
          headers: {
            'x-access-token': token
          }
        });
        setCandidates(response.data);
      } catch (error) {
        setError('Failed to fetch candidates.');
        console.error('Failed to fetch candidates', error);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleDeleteCandidate = async (candidateID) => {
    const token = localStorage.getItem('jwtToken');
    try {
      await axios.delete(`https://voting-app-x15.vercel.app/candidate/${candidateID}`, {
        headers: {
          'x-access-token': token
        }
      });
      setCandidates(candidates.filter(candidate => candidate._id !== candidateID));
    } catch (error) {
      setError('Failed to delete candidate.');
      console.error('Failed to delete candidate', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#151515] text-[#eeeeee]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#151515] text-[#eeeeee]">
        <p>{error}</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-[#151515] h-auto md:h-screen p-5 text-[#eeeeee]">
        <div className="text-center mb-8">
          <img
            src={adminData.profilePicture || 'https://via.placeholder.com/100'}
            alt="Admin"
            className="rounded-full mx-auto mb-2 border-4 border-[#73659e] transition-transform transform hover:scale-110 duration-500"
          />
          <h2 className="text-xl font-semibold">{adminData.name || 'Admin Name'}</h2>
        </div>
        <ul className="space-y-4">
          {[ 
            { to: '/dashboard', text: 'Dashboard' },
            { to: '/registered-parties', text: 'Registered Parties' },
            { to: '/candidates', text: 'Candidates' },
            { to: '/register', text: 'Registration' },
            { to: '/election-results', text: 'Election Results' },
          ].map((link, index) => (
            <li key={index}>
              <Link
                to={link.to}
                className="text-[#eeeeee] hover:bg-[#a91d3a] py-2 px-4 rounded transition-colors duration-300"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 bg-[#eeeeee] p-8">
        <h1 className="text-4xl mb-6 text-[#151515]">Qualified Candidates</h1>

        <div className="flex justify-end mb-4">
          <Link
            to="/add-candidates"
            className="bg-[#73659e] hover:bg-[#a91d3a] text-[#eeeeee] py-2 px-4 rounded transition-colors duration-300"
          >
            Add Candidate
          </Link>
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-[#eeeeee] mb-4">Candidate List</h2>
          <ul>
            {candidates.map((candidate) => (
              <li
                key={candidate._id}
                className="bg-[#2e2e2e] p-4 mb-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
              >
                <h3 className="text-xl font-semibold text-[#eeeeee]">{candidate.name}</h3>
                <p className="text-sm text-[#cccccc]">Age: {candidate.age}</p>
                <p className="text-sm text-[#cccccc]">Party: {candidate.party}</p>
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => handleDeleteCandidate(candidate._id)}
                    className="bg-[#a91d3a] hover:bg-[#d32f2f] text-[#eeeeee] py-2 px-4 rounded transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QualifiedCandidatesPage;
