import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaSearch, FaBell, FaCog, FaUser, 
    FaSignOutAlt, FaGraduationCap 
} from 'react-icons/fa';

const Header = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/signin';
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/75 shadow-lg"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            {/* Logo */}
                            <div className="flex items-center">
                                <Link to="/home" className="flex items-center gap-2">
                                    <FaGraduationCap className="h-8 w-8 text-emerald-600" />
                                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                        G-BUDDY
                                    </span>
                                </Link>
                            </div>

                            {/* Center Search */}
                            <div className="hidden md:flex items-center flex-1 justify-center max-w-lg">
                                <div className="relative w-full mx-8">
                                    <input 
                                        type="text"
                                        placeholder="Search anything..."
                                        className="w-full pl-10 pr-4 py-2 rounded-full border-0 bg-gray-100/90 focus:ring-2 focus:ring-emerald-500 transition-all"
                                    />
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Right Side - Profile */}
                            <div className="flex items-center gap-4">
                                <button className="relative p-2 hover:bg-gray-100/80 rounded-full transition-all">
                                    <FaBell className="w-6 h-6 text-gray-600" />
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                        3
                                    </span>
                                </button>

                                <div className="relative">
                                    <button 
                                        onClick={() => setShowProfile(!showProfile)}
                                        className="flex items-center gap-3 hover:bg-gray-100/80 p-1.5 rounded-full transition-all"
                                    >
                                        <img 
                                            src={user?.avatar || 'https://via.placeholder.com/40'} 
                                            alt="Profile" 
                                            className="w-9 h-9 rounded-full ring-2 ring-emerald-500"
                                        />
                                    </button>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {showProfile && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100"
                                            >
                                                <div className="px-4 py-2 border-b border-gray-100">
                                                    <p className="font-medium text-gray-800">{user?.username}</p>
                                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                                </div>
                                                <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">
                                                    <FaUser className="w-4 h-4" />
                                                    Profile
                                                </Link>
                                                <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">
                                                    <FaCog className="w-4 h-4" />
                                                    Settings
                                                </Link>
                                                <button 
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50"
                                                >
                                                    <FaSignOutAlt className="w-4 h-4" />
                                                    Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Header;
