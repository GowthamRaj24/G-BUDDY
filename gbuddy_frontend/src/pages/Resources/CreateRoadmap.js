import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaLink } from 'react-icons/fa';
import axios from 'axios';
import { BACKEND_URL } from '../backendURL';

const CreateRoadmap = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        difficulty: 'beginner',
        prerequisites: [''],
        topics: [
            {
                title: '',
                orderIndex: 1,
                duration: '',
                resources: [{ title: '', url: '' }]
            }
        ]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(BACKEND_URL+'/roadmaps/createRoadmap', {
                ...formData,
                author: JSON.parse(localStorage.getItem('user'))._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          });
            navigate(`/roadmap/${response.data.data._id}`);
        } catch (error) {
            console.error('Error creating roadmap:', error);
        }
    };

    const addTopic = () => {
        setFormData({
            ...formData,
            topics: [
                ...formData.topics,
                {
                    title: '',
                    orderIndex: formData.topics.length + 1,
                    duration: '',
                    resources: [{ title: '', url: '' }]
                }
            ]
        });
    };

    const addResource = (topicIndex) => {
        const newTopics = [...formData.topics];
        newTopics[topicIndex].resources.push({ title: '', url: '' });
        setFormData({ ...formData, topics: newTopics });
    };

    const addPrerequisite = () => {
        setFormData({
            ...formData,
            prerequisites: [...formData.prerequisites, '']
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                >
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Learning Roadmap</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="AI_ML">AI/ML</option>
                                        <option value="DSA">DSA</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                                    <select
                                        value={formData.difficulty}
                                        onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Prerequisites */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
                                <button
                                    type="button"
                                    onClick={addPrerequisite}
                                    className="text-emerald-600 hover:text-emerald-700"
                                >
                                    <FaPlus className="w-4 h-4" />
                                </button>
                            </div>

                            {formData.prerequisites.map((prereq, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={prereq}
                                        onChange={(e) => {
                                            const newPrerequisites = [...formData.prerequisites];
                                            newPrerequisites[index] = e.target.value;
                                            setFormData({...formData, prerequisites: newPrerequisites});
                                        }}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        placeholder="Enter prerequisite"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newPrerequisites = formData.prerequisites.filter((_, i) => i !== index);
                                            setFormData({...formData, prerequisites: newPrerequisites});
                                        }}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <FaTrash className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}

                        </div>

                        {/* Topics */}
                        {/* Topics Section */}
<div className="space-y-6">
    <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Topics</h2>
        <button
            type="button"
            onClick={addTopic}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
        >
            <FaPlus className="w-4 h-4" />
            Add Topic
        </button>
    </div>

    {formData.topics.map((topic, topicIndex) => (
        <div key={topicIndex} className="bg-gray-50 p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        value={topic.title}
                        onChange={(e) => {
                            const newTopics = [...formData.topics];
                            newTopics[topicIndex].title = e.target.value;
                            setFormData({...formData, topics: newTopics});
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Topic Title"
                        required
                    />
                </div>
                <input
                    type="text"
                    value={topic.duration}
                    onChange={(e) => {
                        const newTopics = [...formData.topics];
                        newTopics[topicIndex].duration = e.target.value;
                        setFormData({...formData, topics: newTopics});
                    }}
                    className="w-48 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Duration"
                />
                <button
                    type="button"
                    onClick={() => {
                        const newTopics = formData.topics.filter((_, index) => index !== topicIndex);
                        setFormData({...formData, topics: newTopics});
                    }}
                    className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                    <FaTrash className="w-4 h-4" />
                </button>
            </div>

            {/* Resources Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700">Resources</h3>
                    <button
                        type="button"
                        onClick={() => addResource(topicIndex)}
                        className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1"
                    >
                        <FaPlus className="w-3 h-3" />
                        Add Resource
                    </button>
                </div>

                {topic.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="flex items-center gap-4">
                        <input
                            type="text"
                            value={resource.title}
                            onChange={(e) => {
                                const newTopics = [...formData.topics];
                                newTopics[topicIndex].resources[resourceIndex].title = e.target.value;
                                setFormData({...formData, topics: newTopics});
                            }}
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Resource Title"
                            required
                        />
                        <div className="flex-1 relative">
                            <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="url"
                                value={resource.url}
                                onChange={(e) => {
                                    const newTopics = [...formData.topics];
                                    newTopics[topicIndex].resources[resourceIndex].url = e.target.value;
                                    setFormData({...formData, topics: newTopics});
                                }}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                placeholder="Resource URL"
                                required
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                const newTopics = [...formData.topics];
                                newTopics[topicIndex].resources = newTopics[topicIndex].resources.filter(
                                    (_, idx) => idx !== resourceIndex
                                );
                                setFormData({...formData, topics: newTopics});
                            }}
                            className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            <FaTrash className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    ))}
</div>


                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/roadmaps')}
                                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                Create Roadmap
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default CreateRoadmap;
