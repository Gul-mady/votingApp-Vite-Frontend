import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState({ name: '', profilePicture: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('jwtToken');

      if (!token) {
        navigate('/403');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        if (!userId) {
          throw new Error('User ID is undefined');
        }

        // Verify user role
        const response = await fetch(`https://voting-app-x15.vercel.app/user/profile/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Role verification failed');
        }

        const data = await response.json();

        if (data.role === 'admin') {
          setIsAdmin(true);
          setAdminData({
            name: data.name,
            profilePicture: data.profilePicture // URL or relative path to profile picture
          });
        } else {
          navigate('/403');
        }
      } catch (error) {
        console.error('Error verifying token or role', error);
        navigate('/login');
      } finally {
        setLoading(false);
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

  if (!isAdmin) {
    return null; // Optionally, you could redirect to another page or show a message
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
        <h1 className="text-4xl mb-6 text-[#151515]">Dashboard</h1>
        
        <div className="bg-[#73659e] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500">
          <h2 className="text-[#eeeeee] text-2xl mb-4">Election Data Centre</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[ 
              { to: '/election-details', title: 'Election Details:', color: '#a91d3a' },
              { to: '/qualified-candidates', title: 'Qualified Candidates:', color: '#a91d3a' },
              { to: '/registered-voters', title: 'Registered Voters:', color: '#73659e' },
              { to: '/election-statics', title: 'Election Statistics:', color: '#73659e' },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded shadow-md transition-transform transform hover:scale-105 duration-500`}
                style={{ backgroundColor: item.color }}
              >
                <h3 className="text-lg text-[#eeeeee]">{item.title}</h3>
                <Link to={item.to} className="text-[#eeeeee] hover:underline transition-colors duration-300">
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
