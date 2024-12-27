import { motion } from 'framer-motion';
import { useState , useEffect } from 'react';
import { FaBookmark, FaFileAlt, FaCalendarAlt, FaUserGraduate, FaDownload, FaEye } from 'react-icons/fa';
import { MdSubject, MdSchool } from 'react-icons/md';
import axios from 'axios';
import { BACKEND_URL } from '../pages/backendURL';
import { useNavigate } from 'react-router-dom';

const PDFPreview = ({ documentUrl }) => {
  const getFileId = (url) => {
    const matches = url.match(/[-\w]{25,}/);
    return matches ? matches[0] : '';
};

  const fileId = getFileId(documentUrl);
  return (
      <iframe
          src={`https://drive.google.com/file/d/${fileId}/preview`}
          width="400"
          height="500"
          className="rounded-lg"
          allow="autoplay"
      />
  );
};


const NotesCard = ({ note }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  

  useEffect(() => {
      if (user.savedNotes?.includes(note._id)) {
          setSaved(true);
      }
  }, [note._id, user.savedNotes]);

  const handleSave = async () => {
      try {
          const response = await axios.post(BACKEND_URL+`/notes/saveNote`, {
              noteId: note._id,
              userId: user._id
          } , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          });
          
          // Toggle saved state
          setSaved(!saved);
          
          // Update user in localStorage with new savedNotes
          const updatedUser = { ...user };
          if (!saved) {
              updatedUser.savedNotes = [...(user.savedNotes || []), note._id];
          } else {
              updatedUser.savedNotes = user.savedNotes.filter(id => id !== note._id);
          }
          localStorage.setItem('user', JSON.stringify(updatedUser));
          console.log(response.data.message);

      } catch (error) {
          console.error('Error toggling save status:', error);
      }
  };

    const formattedDate = new Date(note.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

        // Extract file ID from the full URL
        const getFileId = (url) => {
          const matches = url.match(/[-\w]{25,}/);
          return matches ? matches[0] : '';
      };
  
      const handleView = () => {
          const fileId = getFileId(note.documentUrl);
          // Use the embedded viewer URL
          const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
          window.open(previewUrl, '_blank');
      };
  
      const handleDownload = () => {
          const fileId = getFileId(note.documentUrl);
          // Use the direct download URL
          const downloadUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;
          window.open(downloadUrl, '_blank');
      };

      const handleCardClick = (e) => {
        // Prevent navigation if clicking on buttons
        if (
            e.target.tagName === 'BUTTON' || 
            e.target.closest('button') || 
            e.target.tagName === 'A' ||
            e.target.closest('a')
        ) {
            return;
        }
        navigate(`/notes/${note._id}`);
    };



    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleCardClick}
            transition={{ duration: 0.3 }}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative"
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={() => setShowPreview(false)}
        >
            {/* Preview on Hover */}
            {/* {showPreview && <PDFPreview documentUrl={note.documentUrl} />} */}

            {/* Top Banner */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1" />

            {/* Main Content */}
            <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                            <FaFileAlt className="text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-600">
                              {note.format.toUpperCase()}
                            </span>
                          </div>
                          <button 
                            onClick={handleSave} 
                            className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${saved ? 'text-emerald-500' : 'text-gray-400'}`}>
                            <FaBookmark className={`transition-colors ${saved ? 'text-emerald-500' : 'text-gray-400'}`} />
                          </button>
                        </div>

                        {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                    {note.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {note.description.slice(0, 100)}...
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MdSubject className="text-lg text-emerald-500" />
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Subject</p>
                            <p className="text-sm text-gray-700">{note.subject}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <FaUserGraduate className="text-lg text-emerald-500" />
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Faculty</p>
                            <p className="text-sm text-gray-700">{note.faculty || 'Not specified'}</p>
                        </div>
                    </div>
                </div>

                {/* Tags and Date */}
                <div className="flex items-center justify-between text-sm mb-6">
                    <div className="flex items-center space-x-2 text-gray-500">
                        <FaCalendarAlt className="text-emerald-500" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-medium">
                            Sem {note.sem}
                        </span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                            Unit {note.unit}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={handleView}
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 py-3 rounded-xl font-medium hover:bg-emerald-100 transition-all duration-300"
                    >
                        <FaEye />
                        View
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
                    >
                        <FaDownload />
                        Download
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default NotesCard;
