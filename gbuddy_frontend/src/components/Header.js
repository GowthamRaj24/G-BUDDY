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

    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase() || 'U';
    };

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
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/75 border-b border-gray-200/50"
            >
                <div className="max-w-7xl mx-auto px-4">
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

                        {/* Right Side - Profile & Notifications */}
                        <div className="flex items-center gap-6">
                            {/* Notification Bell */}
                            {/* <button className="relative p-2 hover:bg-gray-100/80 rounded-full transition-colors">
                                <FaBell className="w-5 h-5 text-gray-600" />
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                                    3
                                </span>
                            </button> */}

                            {/* Profile Button */}
                            <div className="relative">
                                <button 
                                    onClick={() => setShowProfile(!showProfile)}
                                    className=" flex items-center gap-3 hover:bg-gray-100/80 py-2 px-3 rounded-full transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-medium text-sm">
                                        {getInitials(user?.username)}
                                    </div>
                                    <span className="text-gray-700 font-medium">{user?.username}</span>
                                </button>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {showProfile && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100"
                                        >
                                            <Link to={`/profile/${user?._id}`} className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">
                                                <FaUser className="w-4 h-4" />
                                                Profile
                                            </Link>
                                            {/* <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">
                                                <FaCog className="w-4 h-4" />
                                                Settings
                                            </Link> */}
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
