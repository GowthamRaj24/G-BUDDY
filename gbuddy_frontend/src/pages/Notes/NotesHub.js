import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    FaPlus, FaSearch, FaBookmark, 
    FaEye, FaFileUpload, FaDownload
} from 'react-icons/fa';
import NotesCard from "../../components/NoteCard";

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

const topNotes = [
    {
        _id: 1,
        title: "Introduction to Data Structures",
        description: "Comprehensive notes covering arrays, linked lists, and basic algorithms",
        sem: 3,
        subject: "Data Structures",
        unit: 1,
        faculty: "Dr. Smith",
        documentUrl: "https://example.com/doc1.pdf",
        format: "PDF",
        date: new Date(),
    },
    {
        _id: 2,
        title: "Digital Electronics Fundamentals",
        description: "Complete guide to boolean algebra and logic gates eaw awd af daw",
        sem: 2,
        subject: "Digital Electronics",
        unit: 2,
        faculty: "Prof. Johnson",
        documentUrl: "https://example.com/doc2.pdf",
        format: "PDF",
        date: new Date(),
    },
    {
        _id: 3,
        title: "Machine Learning Basics",
        description: "Introduction to supervised and unsupervised learning algorithms",
        sem: 5,
        subject: "Machine Learning",
        unit: 1,
        faculty: "Dr. Williams",
        documentUrl: "https://example.com/doc3.pdf",
        format: "PDF",
        date: new Date(),
    }
];

const NotesHub = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Academic Notes Hub</h1>
                            <p className="text-emerald-100">Access and share academic resources</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search notes by title, subject, or faculty..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {quickActions.map((action, index) => (
                        <Link to={action.link} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    {action.icon}
                                </div>
                                <h3 className="font-medium text-lg mb-2 group-hover:text-emerald-600 transition-colors">{action.title}</h3>
                                <p className="text-gray-600">{action.description}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Latest Notes */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Latest Notes</h2>
                        <Link to="/notes/all" className="text-emerald-600 hover:text-emerald-700 font-medium">
                            View All Notes
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {topNotes.map((note, index) => (
                            <NotesCard key={note._id} note={note} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesHub;
