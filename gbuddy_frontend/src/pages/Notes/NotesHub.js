import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    FaPlus, FaSearch, FaBookmark, 
    FaEye, FaFileUpload, FaDownload
} from 'react-icons/fa';
import NotesCard from "../../components/NoteCard";
import axios from 'axios';
import Header from '../../components/Header';
import { BACKEND_URL } from '../backendURL';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};


const quickActions = [
    {
        icon: <FaFileUpload className="text-white" />,
        title: "Upload Notes",
        description: "Share your study materials",
        bgColor: "bg-emerald-500",
        link: "/notes/upload"
    },
    {
        icon: <FaEye className="text-white" />,
        title: "View More Notes",
        description: "Browse all available notes",
        bgColor: "bg-blue-500",
        link: "/notes/all"
    },
    {
        icon: <FaBookmark className="text-white" />,
        title: "Saved Notes",
        description: "Access your bookmarks",
        bgColor: "bg-purple-500",
        link: "/notes/saved"
    }
];

const NotesHub = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const debouncedSearch = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearch) {
            searchNotes();
        } else {
            fetchLatestNotes();
        }
    }, [debouncedSearch]);

    // Fetch notes when search query changes
    useEffect(() => {
        if (searchQuery) {
            searchNotes();
        } else {
            fetchLatestNotes();
        }
    }, [searchQuery]);

    const fetchLatestNotes = async () => {
        try {
            setLoading(true);
            const response = await axios.post(BACKEND_URL+'/notes/getLatestNotes', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          });
            setNotes(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notes:', error);
            setLoading(false);
        }
    };

    const searchNotes = () => {
        
    };


    return (
            <div className="min-h-screen bg-gray-50">
                {/* <Header /> */}
                {/* Enhanced Hero Section */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 pt-20 pb-24 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05] -z-0" />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
                            {/* Left Content */}
                            <div className="flex-1">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8"
                                >
                                    <div className="inline-block px-4 py-2 bg-emerald-500/20 rounded-full mb-6">
                                        <span className="text-emerald-100">✨ Welcome to G-BUDDY</span>
                                    </div>
                                    <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                                        Academic Notes Hub
                                    </h1>
                                    <p className="text-emerald-100 text-lg leading-relaxed">
                                        Your comprehensive study companion for seamless learning and academic excellence
                                    </p>
                                </motion.div>
                            </div>
    
                            {/* Right Content */}
                            <div className="flex-1">
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/20 transition-all duration-300"
                                >
                                    <h3 className="text-white text-2xl font-semibold mb-4">Smart Features</h3>
                                    <ul className="text-emerald-100 space-y-4">
                                        <li className="flex items-center gap-3">
                                            <span className="bg-white/20 p-2 rounded-lg">📚</span>
                                            <span>Intelligent Notes Organization</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="bg-white/20 p-2 rounded-lg">🎯</span>
                                            <span>Focused Learning Path</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="bg-white/20 p-2 rounded-lg">🤖</span>
                                            <span>Smart Content Recommendations</span>
                                        </li>
                                    </ul>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {quickActions.map((action, index) => (
                            <Link to={action.link} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                >
                                    <div className={`w-14 h-14 ${action.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        {action.icon}
                                    </div>
                                    <h3 className="font-semibold text-xl mb-2 group-hover:text-emerald-600 transition-colors">
                                        {action.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {action.description}
                                    </p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
    
                    {/* Latest Notes Section */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Latest Notes</h2>
                            <Link 
                                to="/notes/all" 
                                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                            >
                                View All Notes
                                <span className="text-xl">→</span>
                            </Link>
                        </div>
    
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {notes.map((note) => (
                                    <NotesCard key={note._id} note={note} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

export default NotesHub;
