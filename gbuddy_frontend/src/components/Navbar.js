import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-2">
                        <FaGraduationCap className="h-8 w-8 text-emerald-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            G-BUDDY
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/features">Features</NavLink>
                        <NavLink to="/resources">Resources</NavLink>
                        <NavLink to="/marketplace">Marketplace</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/signin" className="px-6 py-2.5 rounded-full text-emerald-600 hover:text-emerald-700 font-medium transition-all">
                            Login
                        </Link>
                        <Link to="/signup" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-200 transition-all">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, children }) => (
    <Link 
        to={to} 
        className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
    >
        {children}
    </Link>
);

export default Navbar;
