import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import  {jwtDecode} from 'jwt-decode';

const ElectionDetailsPage = () => {
  const [parties, setParties] = useState([]);
  const [partyDetails, setPartyDetails] = useState({});
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
        const profileResponse = await fetch(`http://localhost:4000/user/profile/${userId}`, {
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
          await fetchData(token); // Fetch other data if admin
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

    const fetchData = async (token) => {
      try {
        // Fetch parties
        const partiesResponse = await axios.get('http://localhost:4000/candidate/getCandidates', {
          headers: {
            'x-access-token': token
          }
        });
        setParties(partiesResponse.data);

        // Fetch party details
        const detailsResponse = await axios.get('http://localhost:4000/candidate/vote/count', {
          headers: {
            'x-access-token': token
          }
        });
        setPartyDetails(detailsResponse.data);

      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data', error);
      }
    };

    fetchAdminData();
  }, [navigate]);

  // const handleUpdateParty = (candidateID) => {
  //   navigate(`/edit-candidate/${candidateID}`);
  // };

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
            src={adminData.profilePicture || 'https://via.placeholder.com/100'} // Fallback image if none is set
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
        <h1 className="text-4xl mb-6 text-[#151515]">Election Details</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Parties Section */}
          <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-[#eeeeee] mb-4">Parties</h2>
            <ul>
              {parties.map(party => (
                <li
                  key={party._id}
                  className="bg-[#2e2e2e] p-4 mb-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
                >
                  <h3 className="text-xl font-semibold text-[#eeeeee]">{party.name}</h3>
                  <p className="text-sm text-[#cccccc]">Description: {party.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Party Details Section */}
          <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-[#eeeeee] mb-4">Party Details</h2>
            {Object.keys(partyDetails).length > 0 ? (
              Object.entries(partyDetails).map(([partyId, details]) => (
                <div key={partyId} className="mb-6">
                  <h3 className="text-xl font-semibold text-[#eeeeee] mb-2">Party ID: {partyId}</h3>
                  <div className="bg-[#2e2e2e] p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-[#eeeeee] mb-2">Details Section 1</h4>
                    <p className="text-sm text-[#cccccc]">Votes: {details.votes}</p>
                    <p className="text-sm text-[#cccccc]">Seats: {details.seats}</p>
                  </div>
                  <div className="bg-[#2e2e2e] p-4 mt-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-[#eeeeee] mb-2">Details Section 2</h4>
                    <p className="text-sm text-[#cccccc]">Campaign Details: {details.campaignDetails}</p>
                    <p className="text-sm text-[#cccccc]">Manifesto Summary: {details.manifestoSummary}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#eeeeee]">No details available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionDetailsPage;
