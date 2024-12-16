import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    FaPlus, FaSearch, FaFilter, FaBook, FaBookmark, 
    FaShare, FaStar, FaClock, FaLightbulb, FaRocket, 
    FaGraduationCap, FaSortAlphaDown, FaTag 
} from 'react-icons/fa';
import Header from '../../components/Header';

const NotesHub = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedFeature, setSelectedFeature] = useState('all');

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Smart Notes Hub</h1>
                            <p className="text-emerald-100">Organize, create, and share your academic knowledge</p>
                        </div>
                        <Link 
                            to="/notes/create"
                            className="mt-4 md:mt-0 flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                            <FaPlus />
                            Create New Note
                        </Link>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-lg">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search your notes by title, description, or tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <select
                                value={selectedFeature}
                                onChange={(e) => setSelectedFeature(e.target.value)}
                                className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            >
                                <option value="all">Search by Feature</option>
                                <option value="recent">Most Recent</option>
                                <option value="popular">Most Popular</option>
                                <option value="high-rated">High Rated</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {quickActions.map((action, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                        >
                            <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center mb-3`}>
                                {action.icon}
                            </div>
                            <h3 className="font-medium mb-1">{action.title}</h3>
                            <p className="text-sm text-gray-600">{action.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Recent Notes</h2>
                        <Link to="/notes/all" className="text-emerald-600 hover:text-emerald-700">
                            View All
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentNotes.map((note, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`px-3 py-1 rounded-full text-sm ${note.categoryColor}`}>
                                        {note.category}
                                    </div>
                                    <button className="text-gray-400 hover:text-emerald-600">
                                        <FaBookmark />
                                    </button>
                                </div>
                                <h3 className="text-lg font-medium mb-2">{note.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{note.excerpt}</p>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span className="flex items-center gap-2">
                                        <FaClock />
                                        {note.date}
                                    </span>
                                    <div className="flex items-center gap-4">
                                        <button className="hover:text-emerald-600">
                                            <FaShare />
                                        </button>
                                        <span className="flex items-center gap-1">
                                            <FaStar className="text-yellow-400" />
                                            {note.rating}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-4 mb-4">
                        <FaLightbulb className="w-8 h-8" />
                        <div>
                            <h3 className="text-xl font-bold">AI Study Recommendations</h3>
                            <p className="text-purple-100">Based on your recent notes and study patterns</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {aiSuggestions.map((suggestion, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                                <h4 className="font-medium mb-2">{suggestion.title}</h4>
                                <p className="text-sm text-purple-100">{suggestion.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const categories = [
    { id: 'math', name: 'Mathematics' },
    { id: 'science', name: 'Science' },
    { id: 'history', name: 'History' },
    { id: 'literature', name: 'Literature' }
];

const quickActions = [
    {
        icon: <FaRocket className="text-white" />,
        title: "Quick Note",
        description: "Create a quick note",
        bgColor: "bg-emerald-500"
    },
    {
        icon: <FaShare className="text-white" />,
        title: "Shared Notes",
        description: "Access shared content",
        bgColor: "bg-blue-500"
    },
    {
        icon: <FaBookmark className="text-white" />,
        title: "Saved",
        description: "View saved notes",
        bgColor: "bg-purple-500"
    },
    {
        icon: <FaGraduationCap className="text-white" />,
        title: "Study Sets",
        description: "Manage study sets",
        bgColor: "bg-orange-500"
    }
];

const recentNotes = [
    {
        title: "Calculus Integration Methods",
        excerpt: "Key techniques for solving complex integrals...",
        category: "Mathematics",
        categoryColor: "bg-blue-100 text-blue-600",
        date: "2 hours ago",
        rating: 4.8
    },
];

const aiSuggestions = [
    {
        title: "Review Recommendation",
        description: "Time to review your Calculus notes from last week"
    },
    {
        title: "Study Pattern",
        description: "Your best focus hours are between 9 AM - 11 AM"
    },
    {
        title: "Connection",
        description: "This topic connects with your previous Physics notes"
    }
];

export default NotesHub;
