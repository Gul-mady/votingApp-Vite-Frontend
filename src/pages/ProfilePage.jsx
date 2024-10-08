import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to detect location changes

  // Check if the token is expired
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return true;
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('jwtToken');

      if (!token || isTokenExpired(token)) {
        localStorage.removeItem('jwtToken');
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

        // Fetch the profile data
        const response = await fetch(`https://voting-app-x15.vercel.app/user/profile/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const profileData = await response.json();
        setProfileData(profileData);

        // Fetch the profile picture as a blob
        if (profileData.profilePicture) {
          const pictureResponse = await fetch(`https://voting-app-x15.vercel.app/uploads/${profileData.profilePicture}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!pictureResponse.ok) {
            throw new Error('Failed to fetch profile picture');
          }

          const pictureBlob = await pictureResponse.blob();
          const pictureUrl = URL.createObjectURL(pictureBlob);
          setProfilePictureUrl(pictureUrl);
        }
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
        setError('Failed to load profile data');
        localStorage.removeItem('jwtToken'); // Clear token if fetching fails
        navigate('/login'); // Redirect to login if fetching profile fails
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate, location]);

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

  if (!profileData) {
    return null;
  }

  const handleEditProfile = () => {
    navigate('/editUser');
  };

  return (
    <div className="min-h-screen bg-[#151515] flex flex-col items-center justify-center py-8 px-4">
      <div className="max-w-lg w-full bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profilePictureUrl || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-[#73659e] transition-transform transform hover:scale-110 duration-500"
          />
        </div>

        {/* Profile Details */}
        <div className="text-lg mb-6 text-[#eeeeee]">
          <h1 className="text-3xl font-bold text-center mb-4 text-[#ffffff]">{profileData.name}</h1>
          <p className="mb-2">Email: <span className="font-semibold">{profileData.email}</span></p>
          <p className="mb-2">Age: <span className="font-semibold">{profileData.age}</span></p>
          <p className="mb-2">Mobile: <span className="font-semibold">{profileData.mobile}</span></p>
          <p className="mb-2">Address: <span className="font-semibold">{profileData.address}</span></p>
          <p className="mb-2">Identity Card Number: <span className="font-semibold">{profileData.identityCardNumber}</span></p>
          <p className="mb-2">Role: <span className="font-semibold">{profileData.role}</span></p>
          <p className="mb-2">Has Voted: <span className="font-semibold">{profileData.isVoted ? 'Yes' : 'No'}</span></p>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center">
          <button
            onClick={handleEditProfile}
            className="px-6 py-3 bg-[#73659e] text-[#eeeeee] rounded-lg transition-colors duration-300 hover:bg-[#a91d3a]"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
