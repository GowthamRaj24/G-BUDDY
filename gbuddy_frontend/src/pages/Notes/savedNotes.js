import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NotesCard from '../../components/NoteCard';
import { FaFilter, FaSearch, FaBookOpen, FaChevronLeft , FaChevronRight } from 'react-icons/fa';

const dummyNotes = [
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
    // Add more dummy notes as needed
];

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex items-center justify-center space-x-2 mt-8">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
            <FaChevronLeft />
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
            <button
                key={index + 1}
                onClick={() => onPageChange(index + 1)}
                className={`w-10 h-10 rounded-lg ${
                    currentPage === index + 1
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
            >
                {index + 1}
            </button>
        ))}
        
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
            <FaChevronRight />
        </button>
    </div>
);


const EmptyState = () => (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 px-4"
    >
        <FaBookOpen className="text-6xl text-emerald-200 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Notes Available</h3>
        <p className="text-gray-500 text-center max-w-md">
            There are no notes matching your current filters. Try adjusting your search criteria or check back later.
        </p>
    </motion.div>
);

const SavedNotes = () => {
    const [filters, setFilters] = useState({
        semester: '',
        subject: '',
        unit: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 9; // Number of notes per page


    const filteredNotes = useMemo(() => {
        return dummyNotes.filter(note => {
            const matchesSearch = searchQuery === '' || 
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.faculty.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesSemester = filters.semester === '' || 
                note.sem === parseInt(filters.semester);

            const matchesSubject = filters.subject === '' || 
                note.subject === filters.subject;

            const matchesUnit = filters.unit === '' || 
                note.unit === parseInt(filters.unit);

            return matchesSearch && matchesSemester && matchesSubject && matchesUnit;
        });
    }, [searchQuery, filters, dummyNotes]);

        // Calculate pagination
        const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
        const paginatedNotes = filteredNotes.slice(
            (currentPage - 1) * notesPerPage,
            currentPage * notesPerPage
        );
    
        // Reset to first page when filters change
        React.useEffect(() => {
            setCurrentPage(1);
        }, [searchQuery, filters]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl font-bold text-white mb-4">Notes Library</h1>
                    <p className="text-emerald-100">Explore our collection of academic resources</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="max-w-7xl mx-auto px-6 -mt-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title, subject, or faculty..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                        >
                            <FaFilter />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {/* Filter Options */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100"
                            >
                                <select
                                    value={filters.semester}
                                    onChange={(e) => setFilters({...filters, semester: e.target.value})}
                                    className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">All Semesters</option>
                                    {[1,2,3,4,5,6,7,8].map(sem => (
                                        <option key={sem} value={sem}>Semester {sem}</option>
                                    ))}
                                </select>
                                <select
                                    value={filters.subject}
                                    onChange={(e) => setFilters({...filters, subject: e.target.value})}
                                    className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">All Subjects</option>
                                    <option value="Data Structures">Data Structures</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                    {/* Add more subjects */}
                                </select>
                                <select
                                    value={filters.unit}
                                    onChange={(e) => setFilters({...filters, unit: e.target.value})}
                                    className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">All Units</option>
                                    {[1,2,3,4,5].map(unit => (
                                        <option key={unit} value={unit}>Unit {unit}</option>
                                    ))}
                                </select>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Notes Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-12">
                {filteredNotes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedNotes.map((note) => (
                                <NotesCard key={note._id} note={note} />
                            ))}
                        </div>
                        
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
};

export default SavedNotes;
