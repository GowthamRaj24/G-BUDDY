import { motion } from 'framer-motion';
import { FaBookmark, FaFileAlt, FaCalendarAlt, FaUserGraduate, FaDownload } from 'react-icons/fa';
import { MdSubject, MdSchool } from 'react-icons/md';

const NotesCard = ({ note }) => {
  const formattedDate = new Date(note.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1" />

      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 rounded-full">
            <FaFileAlt className="text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600">
              {note.format.toUpperCase()}
            </span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaBookmark className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
          </button>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
          {note.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {note.description}
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

        {/* Download Button */}
        <a
          href={note.documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <FaDownload />
          Download Notes
        </a>
      </div>
    </motion.div>
  );
};

export default NotesCard;
