import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLink, FaCheckCircle, FaClock, FaBook } from 'react-icons/fa';
import axios from 'axios';

const RoadmapView = () => {
    const { id } = useParams();
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const response = await axios.get(`http://localhost:4001/roadmaps/roadmap/${id}`);
                setRoadmap(response.data.data);
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
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center justify-between mb-6">
                            <span className="px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium">
                                {roadmap?.category}
                            </span>
                            <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                                {roadmap?.difficulty}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{roadmap?.title}</h1>
                        <p className="text-gray-600 mb-6">{roadmap?.description}</p>
                        <div className="flex items-center text-gray-500">
                            <FaBook className="mr-2" />
                            <span>{roadmap?.topics?.length} Topics</span>
                        </div>
                    </div>

                    {/* Prerequisites */}
                    {roadmap?.prerequisites?.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Prerequisites</h2>
                            <ul className="list-disc list-inside space-y-2">
                                {roadmap.prerequisites.map((prereq, index) => (
                                    <li key={index} className="text-gray-600">{prereq}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Topics */}
                    <div className="space-y-6">
                        {roadmap?.topics?.map((topic, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-emerald-100 rounded-full p-3">
                                        <span className="text-emerald-600 font-bold">{index + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                                </div>
                                
                                {topic.description && (
                                    <p className="text-gray-600 mb-6">{topic.description}</p>
                                )}

                                {/* Resources */}
                                {topic.resources?.length > 0 && (
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-gray-700">Resources</h4>
                                        <div className="grid gap-4">
                                            {topic.resources.map((resource, resourceIndex) => (
                                                <a
                                                    key={resourceIndex}
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                                >
                                                    <FaLink className="text-emerald-500" />
                                                    <span className="text-gray-700 hover:text-emerald-600">
                                                        {resource.title}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RoadmapView;
