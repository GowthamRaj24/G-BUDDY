import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaGoogle, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <FaGraduationCap className="h-8 w-8 text-emerald-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            G-BUDDY
                        </span>
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back!</h2>
                    <p className="mt-2 text-gray-600">Enter your details to access your account</p>
                </div>

                {/* Sign In Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-xl"
                >
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-200 transition-all"
                        >
                            Sign In
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

                {/* Sign Up Link */}
                <p className="mt-8 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link 
    to="/signup"
    className="text-sm text-emerald-600 hover:text-emerald-700"
>
    Sign Up
</Link>

                </p>
            </motion.div>
        </div>
        </>
    );
};

export default SignIn;
