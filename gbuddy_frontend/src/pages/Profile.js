import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaBook, FaStore, FaBookmark, FaWallet, FaRoute } from 'react-icons/fa';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import NotesCard from '../components/NoteCard';
import { FaEdit, FaLock, FaLinkedin, FaGithub, FaCode, FaPlus , FaTrash} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from './backendURL';
import { Link } from 'react-router-dom';


const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [userData, setUserData] = useState(null);
    const [userProducts, setUserProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const [mynotes , setMynotes] = useState([]);
    const navigate = useNavigate();
    const [roadmaps , setRoadmaps] = useState([]);

    useEffect(() => {
        fetchUserData();
        fetchUserProducts();
        fetchSavedNotes();
        getNotesById();
        fetchuserRoadmaps();
        setLoading(false);
    }, []);

    const getNotesById = async () => {
        try {
            const response = await axios.get(BACKEND_URL+`/notes/fetchbyUser/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          });
            console.log("-->"+response);
            setMynotes(response.data.data);
        } catch (error) {
            console.log('Error fetching notes:', error);
        }
    };

    const fetchSavedNotes = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const savedNoteIds = user.savedNotes || [];
            
            if (savedNoteIds.length === 0) return;

            const response = await axios.post(BACKEND_URL+`/notes/getSavedNotes`, {
                 noteIds: savedNoteIds 
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          });
            
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching saved notes:', error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get(BACKEND_URL+`/users/fetchUser/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          });
            setUserData(response.data.data);
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };

    const fetchUserProducts = async () => {
        try {
            const response = await axios.get(BACKEND_URL+'/products/fetchProductBySeller/'+userId, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          });
            setUserProducts(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching user products:', error);
            setLoading(false);
        }
    };

    const fetchuserRoadmaps = async () => {
        await axios.get(BACKEND_URL+"/roadmaps/roadmap/user/" + userId, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
      })
        .then((res) => {
            setRoadmaps(res.data.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching roadmaps:', error);
            setLoading(false);
        })
    }


    const tabs = [
        { id: 'profile', label: 'Profile', icon: FaUser },
        { id: 'products', label: 'My Products', icon: FaStore },
        { id: 'saved', label: 'Saved Items', icon: FaBookmark },
        { id: 'notes', label: 'My Notes', icon: FaBook },
        { id : 'roadmaps', label: 'Roadmaps', icon: FaRoute }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-emerald-500">
                            <span className="text-4xl font-bold">
                                {userData?.username?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{userData?.username}</h1>
                            <p className="text-emerald-50">{userData?.email}</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        
                        <div className="bg-white/10 rounded-xl p-4">
                            <p className="text-emerald-50">My Products</p>
                            <p className="text-2xl font-bold">{userProducts.length}</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <p className="text-emerald-50">Saved Items</p>
                            <p className="text-2xl font-bold">{notes?.length}</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <p className="text-emerald-50">My Notes</p>
                            <p className="text-2xl font-bold">{mynotes?.length}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white rounded-2xl shadow-lg mb-8">
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors
                                    ${activeTab === tab.id 
                                        ? 'text-emerald-600 border-b-2 border-emerald-500' 
                                        : 'text-gray-500 hover:text-emerald-600'}`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">


                {activeTab === 'profile' && (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl p-8 shadow-lg space-y-8"
    >
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            <div className="flex gap-4">
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/editprofile')}
                    className="px-6 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors shadow-lg flex items-center gap-2"
                >
                    <FaEdit className="w-4 h-4" />
                    Edit Profile
                </motion.button>
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/resetpassword')}
                    className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors shadow-lg flex items-center gap-2"
                >
                    <FaLock className="w-4 h-4" />
                    Change Password
                </motion.button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Username</p>
                            <p className="font-medium text-lg">{userData?.username}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-lg">{userData?.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-lg">{userData?.phone || 'Not set'}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Academic Details</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Branch</p>
                            <p className="font-medium text-lg">{userData?.branch || 'Not set'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="font-medium text-lg">{userData?.year || 'Not set'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Roll Number</p>
                            <p className="font-medium text-lg">{userData?.rollnumber || 'Not set'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Social Profiles</h3>
                    <div className="space-y-4">
                        {userData?.linkedin && (
                            <a 
                                href={userData.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg hover:shadow-md transition-all"
                            >
                                <FaLinkedin className="w-6 h-6 text-blue-600" />
                                <span className="text-gray-700">LinkedIn Profile</span>
                            </a>
                        )}
                        {userData?.github && (
                            <a 
                                href={userData.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg hover:shadow-md transition-all"
                            >
                                <FaGithub className="w-6 h-6 text-gray-800" />
                                <span className="text-gray-700">GitHub Profile</span>
                            </a>
                        )}
                        {userData?.leetcode && (
                            <a 
                                href={userData.leetcode}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg hover:shadow-md transition-all"
                            >
                                <FaCode className="w-6 h-6 text-yellow-500" />
                                <span className="text-gray-700">LeetCode Profile</span>
                            </a>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Information</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="font-medium text-lg">
                                {new Date(userData?.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
)}



                    {activeTab === 'products' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">My Products</h2>
                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {userProducts.map((product) => (
    <div key={product._id} className="relative">
        <ProductCard product={product} />
        <button
            onClick={async () => {
                if (window.confirm('Are you sure you want to delete this product?')) {
                    try {
                        await axios.delete(BACKEND_URL+`/products/deleteProduct/${product._id}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                      });
                        fetchUserProducts(); // Refresh the list
                    } catch (error) {
                        console.error('Error deleting product:', error);
                    }
                }
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-600 bg-white rounded-full p-2 shadow-md"
        >
            <FaTrash className="w-4 h-4" />
        </button>
    </div>
))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'saved' && (
                                                <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <h2 className="text-2xl font-bold mb-6">Saved Items</h2>
                                                {loading ? (
                                                    <div className="flex justify-center py-12">
                                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {notes.map((note) => (
                                                            <NotesCard key={note._id} note={note} />
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                    )}

                    {activeTab === 'notes' && (
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h2 className="text-2xl font-bold mb-6">My Notes</h2>
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mynotes.map((note) => (
    <div key={note._id} className="relative">
        <NotesCard note={note} />
        <div className="absolute top-2 right-2 flex gap-2">
            <Link 
                to={`/notes/edit/${note._id}`}
                className="text-blue-500 hover:text-blue-600 bg-white rounded-full p-2 shadow-md"
            >
                <FaEdit className="w-4 h-4" />
            </Link>
            <button
                onClick={async () => {
                    if (window.confirm('Are you sure you want to delete this note?')) {
                        try {
                            await axios.delete(BACKEND_URL+`/notes/deleteNote/${note._id}`, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            });
                            getNotesById();
                        } catch (error) {
                            console.error('Error deleting note:', error);
                        }
                    }
                }}
                className="text-red-500 hover:text-red-600 bg-white rounded-full p-2 shadow-md"
            >
                <FaTrash className="w-4 h-4" />
            </button>
        </div>
    </div>
))}


                            </div>
                        )}
                    </motion.div>
                    )}

{activeTab === 'roadmaps' && (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Roadmaps</h2>
            <button
                onClick={() => navigate('/roadmaps/create')}
                className="px-6 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2"
            >
                <FaPlus className="w-4 h-4" />
                Create Roadmap
            </button>
        </div>
        
        {loading ? (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmaps.map((roadmap) => (
                    <div
                        key={roadmap._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{roadmap.title}</h3>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                                    {roadmap.category}
                                </span>
                                <button
                                    onClick={async () => {
                                        if (window.confirm('Are you sure you want to delete this roadmap?')) {
                                            try {
                                                await axios.delete(BACKEND_URL+`/roadmaps/roadmap/${roadmap._id}`, {
                                                    headers: {
                                                        Authorization: `Bearer ${localStorage.getItem('token')}`
                                                    }
                                              });
                                                fetchuserRoadmaps();
                                            } catch (error) {
                                                console.error('Error deleting roadmap:', error);
                                            }
                                        }
                                    }}
                                    className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                    <FaTrash className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">{roadmap.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                                {roadmap.topics?.length} Topics
                            </span>
                            <button
                                onClick={() => navigate(`/roadmap/${roadmap._id}`)}
                                className="text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                                View Details →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </motion.div>
)}



                    
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
