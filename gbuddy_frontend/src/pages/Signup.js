import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaGoogle, FaGithub } from 'react-icons/fa';
// import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // try {
        //     const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
            
        //     if (response.data.success) {
        //         localStorage.setItem('token', response.data.token);
        //         localStorage.setItem('user', JSON.stringify(response.data.data));
        //         navigate('/dashboard');
        //     }
        // } catch (error) {
        //     setError(error.response?.data?.message || 'Registration failed');
        // }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <FaGraduationCap className="h-8 w-8 text-emerald-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            G-BUDDY
                        </span>
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-gray-600">Join our community of learners</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-2xl shadow-xl"
                >
                    {error && (
                        <div className="mb-4 p-3 rounded bg-red-100 text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder='Enter your Username'
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder='Enter Your Email'
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                placeholder='Phone Number'
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder='Password'
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-200 transition-all"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 hover:border-emerald-500 hover:shadow-lg transition-all">
                                <FaGoogle className="text-red-500" />
                                <span className="ml-2">Google</span>
                            </button>
                            <button className="flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 hover:border-emerald-500 hover:shadow-lg transition-all">
                                <FaGithub className="text-gray-900" />
                                <span className="ml-2">GitHub</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                <p className="mt-8 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/signin" className="font-medium text-emerald-600 hover:text-emerald-700">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignUp;
