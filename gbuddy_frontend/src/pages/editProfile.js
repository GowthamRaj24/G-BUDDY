import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BACKEND_URL } from './backendURL';

const EditProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        displayname: '',
        description: '',
        campus: '',
        branch: '',
        year: '',
        rollnumber: '',
        linkedin: '',
        github: '',
        leetcode: '',
        semester: '',
        phone: ''
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            const response = await axios.get(BACKEND_URL+`/users/fetchUser/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          });
            setFormData(response.data.data);
        } catch (error) {
            setError('Failed to fetch user data');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            const response = await axios.put(BACKEND_URL+`/users/updateProfile/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          });
            localStorage.setItem('user', JSON.stringify(response.data.data));
            navigate('/profile/' + userId);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                >
                    <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
                    
                    {error && (
                        <div className="mb-4 p-3 rounded bg-red-100 text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Branch
                                </label>
                                <input
                                    type="text"
                                    value={formData.branch}
                                    onChange={(e) => setFormData({...formData, branch: e.target.value})}
                                    className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Year
                                </label>
                                <input
                                    type="number"
                                    value={formData.year}
                                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                                    className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Roll Number
                                </label>
                                <input
                                    type="text"
                                    value={formData.rollnumber}
                                    onChange={(e) => setFormData({...formData, rollnumber: e.target.value})}
                                    className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    LinkedIn Profile
                                </label>
                                <input
                                    type="url"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                                    className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    GitHub Profile
                                </label>
                                <input
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                                    className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    LeetCode Profile
                                </label>
                                <input
                                    type="url"
                                    value={formData.leetcode}
                                    onChange={(e) => setFormData({...formData, leetcode: e.target.value})}
                                    className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(`/profile/${JSON.parse(localStorage.getItem('user'))._id}`)}
                                className="px-6 py-3 rounded-xl border border-gray-300 hover:border-emerald-500 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default EditProfile;
