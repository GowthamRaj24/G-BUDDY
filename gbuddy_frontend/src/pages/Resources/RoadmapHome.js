import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaBookOpen, FaCode, FaRobot, FaDatabase } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../backendURL';

const RoadmapHome = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [roadmaps, setRoadmaps] = useState([]);
    const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);
    const [username , setUsername] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [categories, setCategories] = useState([
        { name: 'Web Development', icon: FaCode, count: 0 },
        { name: 'Data Science', icon: FaDatabase, count: 0 },
        { name: 'AI_ML', icon: FaRobot, count: 0 },
        { name: 'DSA', icon: FaBookOpen, count: 0 }
    ]);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('user'))._id;
                const response = await axios.get(BACKEND_URL+`/users/fetchUser/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
              });
                setUsername(response.data.data.name);
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };


        const fetchRoadmaps = async () => {
            try {
                const response = await axios.get(BACKEND_URL+'/roadmaps/roadmaps', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
              });
                setRoadmaps(response.data.data);
                setFilteredRoadmaps(response.data.data);
                
                // Update category counts
                const updatedCategories = categories.map(category => ({
                    ...category,
                    count: response.data.data.filter(roadmap => 
                        roadmap.category === category.name
                    ).length
                }));
                
                setCategories(updatedCategories);
            } catch (error) {
                console.error('Error fetching roadmaps:', error);
            }
        };
        fetchRoadmaps();
        fetchUserData();
    }, []);
    

    const handleCategoryClick = async (categoryName) => {
        try {
            const response = await axios.get(BACKEND_URL+`/roadmaps/roadmaps/category/${categoryName}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          });
            setFilteredRoadmaps(response.data.data);
            setSelectedCategory(categoryName);
        } catch (error) {
            console.error('Error fetching category roadmaps:', error);
        }
    };

    // Handle search
    useEffect(() => {
        if (searchQuery) {
            const filtered = roadmaps.filter(roadmap => 
                roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                roadmap.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredRoadmaps(filtered);
        } else {
            setFilteredRoadmaps(roadmaps);
        }
    }, [searchQuery, roadmaps]);

    // Navigate to roadmap view
    const handleViewRoadmap = (roadmapId) => {
        navigate(`/roadmap/${roadmapId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        
        <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white overflow-hidden">
    <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]"></div>
    <div className="relative max-w-7xl mx-auto px-4 py-16">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
        >
            <h1 className="text-5xl font-bold mb-6">Learning Roadmaps</h1>
            <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
                Discover structured learning paths created by experts and community
            </p>

            <div className="max-w-2xl mx-auto">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Search roadmaps..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 focus:ring-4 focus:ring-emerald-300 focus:border-transparent shadow-lg"
                    />
                    <FaSearch className="absolute left-4 text-gray-400 text-xl" />
                    <button 
                        onClick={() => navigate('/roadmaps/create')}
                        className="ml-4 px-6 py-4 bg-white text-emerald-600 rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg flex items-center gap-2 font-medium"
                    >
                        <span>Create</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
</div>

            
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {categories.map((category) => (
                        <div 
                            key={category.name}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                                selectedCategory === category.name ? 'ring-2 ring-emerald-500' : ''
                            }`}
                        >
                            <category.icon className="w-8 h-8 text-emerald-500 mb-4" />
                            <h3 className="font-semibold text-gray-800">{category.name}</h3>
                            <p className="text-emerald-600">{category.count} roadmaps</p>
                        </div>
                    ))}
                </div>

                {/* Featured Roadmaps */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">All Roadmaps</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRoadmaps.map((roadmap) => (
                        <div 
                            key={roadmap._id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                                        {roadmap.category}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {roadmap.topics?.length || 0} topics
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                                    {roadmap.title}
                                </h3>
                                <p className="text-gray-600">By {username || 'Anonymous'}</p>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">{roadmap.difficulty}</span>
                                    <button 
                                        onClick={() => handleViewRoadmap(roadmap._id)}
                                        className="text-emerald-600 font-medium hover:text-emerald-700"
                                    >
                                        View Roadmap →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoadmapHome;
