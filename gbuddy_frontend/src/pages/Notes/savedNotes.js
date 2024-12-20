import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import NotesCard from '../../components/NoteCard';
import { FaFilter, FaSearch, FaBookOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Pagination , EmptyState } from './NotesLibrary';
import { BACKEND_URL } from '../backendURL';

const SavedNotes = () => {
    const [notes, setNotes] = useState([]);
    const [filters, setFilters] = useState({
        semester: '',
        subject: '',
        unit: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 9;

    // Fetch saved notes from backend
    useEffect(() => {
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

        fetchSavedNotes();
    }, []);

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
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
    }, [searchQuery, filters, notes]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
    const paginatedNotes = filteredNotes.slice(
        (currentPage - 1) * notesPerPage,
        currentPage * notesPerPage
    );

    // Get unique subjects for filter dropdown
    const uniqueSubjects = [...new Set(notes.map(note => note.subject))];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl font-bold text-white mb-4">Saved Notes</h1>
                    <p className="text-emerald-100">Your personal collection of academic resources</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="max-w-7xl mx-auto px-6 -mt-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    {/* ... existing search and filter UI ... */}
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
                                    {uniqueSubjects.map(subject => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
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
                {paginatedNotes.length > 0 ? (
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
