import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [profilePic, setProfilePic] = useState(null); // State for profile picture
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Extract userId from the JWT token
    const getUserIdFromToken = () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return decoded.id;
            } catch (error) {
                console.error('Token decoding error:', error);
            }
        }
        return null;
    };

    // Fetch user details on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = getUserIdFromToken();
            if (!userId) {
                setError('User ID not found. Please log in again.');
                navigate('/login');
                return;
            }

            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get(`http://localhost:4000/user/profile/${userId}`, {
                    headers: {
                        'x-access-token': token
                    }
                });

                const userData = response.data;
                setName(userData.name || '');
                setEmail(userData.email || '');
                setAge(userData.age || '');
                setMobile(userData.mobile || '');
                setAddress(userData.address || '');
                setProfilePic(userData.profilePic || null); // Set profile picture
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const userId = getUserIdFromToken();
    
        if (!userId) {
            setError('User ID not found. Please log in again.');
            return;
        }
    
        try {
            const token = localStorage.getItem('jwtToken');
            const data = {
                currentPassword,
                newPassword,
                name,
                email,
                age,
                mobile,
                address,
            };
    
            const response = await axios.put(`http://localhost:4000/user/${userId}`, data, {
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                }
            });
    
            setMessage(response.data.message);
            setError('');
    
            // Navigate back to the ProfilePage after successful update
            navigate(`/profile`);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred while updating data.');
            setMessage('');
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#151515] px-4 py-6">
            <div className="flex flex-col max-w-[500px] w-full bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
                {/* Profile Picture Section */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32">
                        <img
                            src={profilePic ? profilePic : 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full border-4 border-[#73659e] transition-transform transform hover:scale-110 duration-500"
                        />
                        <label className="absolute bottom-0 right-0 bg-[#73659e] text-[#eeeeee] p-1 rounded-full cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfilePic(e.target.files[0])}
                                className="hidden"
                            />
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L20 7" />
                            </svg>
                        </label>
                    </div>
                </div>

                <h1 className="text-3xl font-semibold text-[#eeeeee] text-center mb-6">Update User Information</h1>

                {message && <div className="text-green-500 text-center mb-4">{message}</div>}
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-[#eeeeee] font-medium mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-2 py-1 border rounded-lg bg-[#2d2d2d] text-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#73659e]"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#eeeeee] font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-2 py-1 border rounded-lg bg-[#2d2d2d] text-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#73659e]"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#eeeeee] font-medium mb-2" htmlFor="age">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full px-2 py-1 border rounded-lg bg-[#2d2d2d] text-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#73659e]"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#eeeeee] font-medium mb-2" htmlFor="mobile">
                            Mobile
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full px-2 py-1 border rounded-lg bg-[#2d2d2d] text-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#73659e]"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#eeeeee] font-medium mb-2" htmlFor="address">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-2 py-1 border rounded-lg bg-[#2d2d2d] text-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#73659e]"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#eeeeee] font-medium mb-2" htmlFor="currentPassword">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-2 py-1 border rounded-lg bg-[#2d2d2d] text-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#73659e]"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#eeeeee] font-medium mb-2" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-2 py-1 border rounded-lg bg-[#2d2d2d] text-[#eeeeee] focus:outline-none focus:ring-2 focus:ring-[#73659e]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#73659e] text-[#eeeeee] py-2 rounded-lg hover:bg-[#a91d3a] transition duration-300"
                    >
                        Update Information
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
