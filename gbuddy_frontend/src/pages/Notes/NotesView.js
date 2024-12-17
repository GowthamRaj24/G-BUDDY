import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaBookmark, FaShare, FaYoutube, FaLightbulb, FaPlay, FaRegClock, FaUserGraduate, FaRegBookmark, FaRegThumbsUp, FaPlus } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Notes.css";

const NotesView = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likes, setLikes] = useState(245);
    const [hasLiked, setHasLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videos, setVideos] = useState([]);

    const studyTips = [
        {
        title: "Active Recall",
        description: "Test yourself frequently. Create flashcards and practice problems to reinforce learning.",
        icon: "🧠"
            },
            {
                title: "Spaced Repetition",
                description: "Review material at increasing intervals to improve long-term retention.",
                icon: "⏰"
            },
            {
                title: "Mind Mapping",
                description: "Create visual connections between concepts to understand relationships better.",
         icon: "🗺️"
            },
            {
                title: "Teach Others",
                description: "Explaining concepts to others helps solidify your understanding.",
                icon: "👥"
            }
        ];
        
        
        const relatedNotes = [
            {
                id: 1,
                title: "Advanced Algorithms",
                subject: "Computer Science",
                author: "Dr. Smith",
                downloads: 1234,
                rating: 4.8
            },
            {
                id: 2,
                title: "Graph Theory",
                subject: "Mathematics",
                author: "Prof. Johnson",
                downloads: 892,
                rating: 4.6
            },
            {
                id: 3,
                title: "Dynamic Programming",
                subject: "Computer Science",
                author: "Dr. Williams",
                downloads: 1567,
                rating: 4.9
            }
        ];
        

    const handleAddVideo = (newVideo) => {
        setVideos([...videos, { ...newVideo, id: videos.length + 1, views: '0' }]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Document Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-4 py-1 bg-emerald-500/20 rounded-full text-sm">Computer Science</span>
                            <span className="px-4 py-1 bg-emerald-500/20 rounded-full text-sm">4.8 ★</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-6">Data Structures and Algorithms</h1>
                        <div className="flex flex-wrap items-center gap-6 text-emerald-100 mb-8">
                            <div className="flex items-center">
                                <FaUserGraduate className="mr-2" />
                                <span>Prof. John Doe</span>
                            </div>
                            <div className="flex items-center">
                                <FaRegClock className="mr-2" />
                                <span>Last Updated: 2 days ago</span>
                            </div>
                        </div>
                        
                        {/* Document Preview & Download */}
                        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-lg">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Document Overview</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                                        Complete DSA concepts with examples
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                                        Practice problems included
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                                        Interview preparation guide
                                    </li>
                                </ul>
                            </div>
                            <div className="flex items-center gap-4">
                                <a
                                    href="/path-to-pdf"
                                    className="flex-1 text-center py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
                                >
                                    <FaDownload className="inline mr-2" />
                                    Download PDF
                                </a>
                                <button
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={`p-3 rounded-lg transition-colors ${
                                        isBookmarked ? 'bg-emerald-500' : 'bg-white/10'
                                    }`}
                                >
                                    <FaRegBookmark />
                                </button>
                                <button
                                    onClick={() => setHasLiked(!hasLiked)}
                                    className={`p-3 rounded-lg transition-colors ${
                                        hasLiked ? 'bg-emerald-500' : 'bg-white/10'
                                    }`}
                                >
                                    <FaRegThumbsUp />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Video Section */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Related Video Resources</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            <FaPlus className="mr-2" />
                            Contribute Video
                        </button>
                    </div>
                    
                    {videos.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((video) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                                >
                                    <div className="aspect-video">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${video.embedId}`}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold mb-2">{video.title}</h3>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <span className="flex items-center">
                                                <FaUserGraduate className="mr-1" />
                                                {video.instructor}
                                            </span>
                                            <span className="mx-2">•</span>
                                            <span>{video.duration}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <FaYoutube className="text-4xl text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No video resources yet. Be the first to contribute!</p>
                        </div>
                    )}
                </div>

                {/* Add Video Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Add Video Resource</h3>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    ×
                                </button>
                            </div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                handleAddVideo({
                                    title: formData.get('title'),
                                    embedId: formData.get('embedId'),
                                    instructor: formData.get('instructor'),
                                    duration: formData.get('duration')
                                });
                                setIsModalOpen(false);
                            }} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Video Title</label>
                                    <input
                                        name="title"
                                        type="text"
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">YouTube Video ID</label>
                                    <input
                                        name="embedId"
                                        type="text"
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="e.g., dQw4w9WgXcQ"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Instructor</label>
                                    <input
                                        name="instructor"
                                        type="text"
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Duration</label>
                                    <input
                                        name="duration"
                                        type="text"
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="e.g., 10:30"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                                >
                                    Add Video
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Study Tips Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Study Tips</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {studyTips.map((tip, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center mb-2">
                                    <span className="text-2xl mr-3">{tip.icon}</span>
                                    <h4 className="font-medium text-gray-800">{tip.title}</h4>
                                </div>
                                <p className="text-sm text-gray-600">{tip.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesView;
