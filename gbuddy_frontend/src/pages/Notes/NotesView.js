import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaBookmark, FaYoutube, FaUserGraduate, FaRegBookmark, FaPlus, FaEye, FaCalendar , FaBookOpen , FaGraduationCap, FaFileAlt } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NotesView = () => {
    const { noteId } = useParams();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videos, setVideos] = useState([]);
    const [noteData, setNoteData] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchNoteData();
        checkBookmarkStatus();
    }, [noteId]);

    const fetchNoteData = async () => {
        try {
            const response = await axios.get(`http://localhost:4001/notes/${noteId}`);
            setNoteData(response.data.data);
            setVideos(response.data.data.relatedVideos || []);
        } catch (error) {
            console.error('Error fetching note data:', error);
        }
    };

    const checkBookmarkStatus = () => {
        setIsBookmarked(user.savedNotes?.includes(noteId));
    };

    const handleBookmark = async () => {
        try {
            await axios.post('http://localhost:4001/notes/saveNote', {
                noteId,
                userId: user._id
            });
            setIsBookmarked(!isBookmarked);
            
            const updatedUser = { ...user };
            if (!isBookmarked) {
                updatedUser.savedNotes = [...(user.savedNotes || []), noteId];
            } else {
                updatedUser.savedNotes = user.savedNotes.filter(id => id !== noteId);
            }
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };
    const handleAddVideo = async (videoData) => {
        const youtubeUrlPattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        if (!youtubeUrlPattern.test(videoData.embedId)) {
            alert('Please enter a valid YouTube URL.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4001/notes/contributeVideo', {
                noteId,
                videoTitle: videoData.title,
                videoUrl: videoData.embedId
            });
            setVideos(response.data.data.relatedVideos);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error contributing video:', error);
        }
    };

    const handleViewPDF = () => {
        const fileId = getFileId(noteData.documentUrl);
        const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        window.open(previewUrl, '_blank');
    };

    const getFileId = (url) => {
        const matches = url.match(/[-\w]{25,}/);
        return matches ? matches[0] : '';
    };

    const getYoutubeVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

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
                            <span className="px-4 py-1 bg-emerald-500/20 rounded-full text-sm">{noteData?.subject}</span>
                            <span className="px-4 py-1 bg-emerald-500/20 rounded-full text-sm">Semester {noteData?.sem}</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-6">{noteData?.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-emerald-100 mb-8">
                            <div className="flex items-center">
                                <FaUserGraduate className="mr-2" />
                                <span>{noteData?.faculty}</span>
                            </div>

                        </div>

                        {/* Document Actions */}
                        {/* Document Actions */}
<div className="bg-white/5 rounded-xl p-6 backdrop-blur-lg">
    {/* Document Info */}
    <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Document Details</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
                <FaFileAlt className="text-emerald-300" />
                <span className="text-emerald-100">{noteData?.format || 'PDF'}</span>
            </div>
            
            <div className="flex items-center space-x-2">
                <FaBookOpen className="text-emerald-300" />
                <span className="text-emerald-100">Unit {noteData?.unit}</span>
            </div>
            <div className="flex items-center space-x-2">
                <FaCalendar className="text-emerald-300" />
                <span className="text-emerald-100">
                    {new Date(noteData?.date).toLocaleDateString()}
                </span>
            </div>
        </div>
        <p className="text-emerald-100">{noteData?.description}</p>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-4">
        <button
            onClick={handleViewPDF}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 py-3 px-4 rounded-lg transition-colors"
        >
            <FaEye />
            <span>View PDF</span>
        </button>

        <a
            href={noteData?.documentUrl}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 py-3 px-4 rounded-lg transition-colors"
        >
            <FaDownload />
            <span>Download</span>
        </a>

        <button
            onClick={handleBookmark}
            className={`px-4 rounded-lg transition-colors ${
                isBookmarked ? 'bg-emerald-500' : 'bg-white/10 hover:bg-white/20'
            }`}
        >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
    </div>
</div>

                        
                    </motion.div>
                </div>
            </div>

            {/* Video Section */}
            <div className="max-w-5xl mx-auto px-6 py-12">
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
                            {videos.map((video, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                                >
                                    <div className="aspect-video">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYoutubeVideoId(video.url)}`}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold mb-2">{video.title}</h3>
                                        <div className="text-sm text-gray-600">
                                            {new Date(video.timestamp).toLocaleDateString()}
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
                                embedId: formData.get('embedId')
                            });
                        }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Video Title*</label>
                                <input
                                    name="title"
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">YouTube URL*</label>
                                <input
                                    name="embedId"
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="https://youtube.com/watch?v=..."
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
        </div>
    );
};

export default NotesView;
