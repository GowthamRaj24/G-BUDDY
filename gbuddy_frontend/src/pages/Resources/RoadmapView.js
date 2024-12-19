import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLink, FaClock, FaBookmark, FaShare, FaEdit } from 'react-icons/fa';
import axios from 'axios';

const RoadmapView = () => {
    const { id } = useParams();
    const [roadmap, setRoadmap] = useState(null);
    const [activeTopicIndex, setActiveTopicIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const response = await axios.get(`http://localhost:4001/roadmaps/roadmap/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
              });
                setRoadmap(response.data.data);
                console.log(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching roadmap:', error);
                setLoading(false);
            }
        };
        fetchRoadmap();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                                {roadmap?.category}
                            </span>
                            
                        </div>
                        <h1 className="text-4xl font-bold">{roadmap?.title}</h1>
                        <p className="text-emerald-50 max-w-3xl">{roadmap?.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-2">
                                <FaClock />
                                {roadmap?.topics?.length} Topics
                            </span>
                            <span className="px-3 py-1 bg-emerald-500 rounded-full">
                                {roadmap?.difficulty}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-12 gap-8">
                    {/* Topics Navigation */}
                    <div className="col-span-4">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Topics</h2>
                            <div className="space-y-2">
                                {roadmap?.topics?.map((topic, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTopicIndex(index)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                                            activeTopicIndex === index
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-sm">
                                                {index + 1}
                                            </span>
                                            <span className="font-medium">{topic.title}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Topic Content */}
                    <div className="col-span-8">
                        <motion.div
                            key={activeTopicIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            {/* Prerequisites */}
                            {roadmap?.prerequisites?.length > 0 && activeTopicIndex === 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Prerequisites</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                                        {roadmap.prerequisites.map((prereq, index) => (
                                            <li key={index}>{prereq}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Active Topic */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {roadmap?.topics[activeTopicIndex]?.title}
                                    </h3>
                                    {roadmap?.topics[activeTopicIndex]?.duration && (
                                        <span className="flex items-center gap-2 text-gray-500">
                                            <FaClock />
                                            {roadmap.topics[activeTopicIndex].duration}
                                        </span>
                                    )}
                                </div>

                                {/* Resources */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-700">Learning Resources</h4>
                                    <div className="grid gap-4">
                                        {roadmap?.topics[activeTopicIndex]?.resources.map((resource, index) => (
                                            <a
                                                key={index}
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors group"
                                            >
                                                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                    <FaLink className="text-emerald-600" />
                                                </div>
                                                <div>
                                                    <h5 className="font-medium text-gray-800 group-hover:text-emerald-600 transition-colors">
                                                        {resource.title}
                                                    </h5>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {resource.url}
                                                    </p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between">
                                <button
                                    onClick={() => setActiveTopicIndex(prev => Math.max(0, prev - 1))}
                                    disabled={activeTopicIndex === 0}
                                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous Topic
                                </button>
                                <button
                                    onClick={() => setActiveTopicIndex(prev => Math.min(roadmap.topics.length - 1, prev + 1))}
                                    disabled={activeTopicIndex === roadmap.topics.length - 1}
                                    className="px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next Topic
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadmapView;
