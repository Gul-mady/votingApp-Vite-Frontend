import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import  {jwtDecode} from 'jwt-decode';

const RegisteredVoter = () => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState({ name: '', profilePicture: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('jwtToken');
      // console.log(token)
      
      if (!token) {
        navigate('/login');
        // console.log("token not found")
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
            profilePicture: profileData.profilePicture // URL or relative path to profile picture
          });
          await fetchVoters(token); // Fetch voters data
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

    const fetchVoters = async (token) => {
      try {
        const response = await axios.get('https://voting-app-x15.vercel.app/user/userProfiles', {
          headers: {
            'x-access-token': token
          }
        });
        setVoters(response.data.filter(user => user.role === 'voter'));
      } catch (error) {
        console.error('Failed to fetch voters', error);
        setError('Failed to fetch voters.');
      }
    };

    fetchAdminData();
  }, [navigate]);

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
            { to: '/registered-voters', text: 'Registered Voters' },
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
        <h1 className="text-4xl mb-6 text-[#151515]">Registered Voters</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {voters.map((voter) => (
            <div
              key={voter._id}
              className="bg-[#151515] text-[#eeeeee] p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={voter.profilePicture || 'https://via.placeholder.com/150'}
                  alt={voter.name}
                  className="w-16 h-16 object-cover rounded-full border-4 border-[#73659e] transition-transform transform hover:scale-110 duration-500"
                />
                <div>
                  <h2 className="text-xl font-semibold">{voter.name}</h2>
                  <p>ID: {voter.identityCardNumber}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisteredVoter;
