import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaList, FaTh, FaBookmark, FaTrash, FaShare } from 'react-icons/fa';
import Header from '../../components/Header';

const NotesLibrary = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [filters, setFilters] = useState({
        category: 'all',
        sort: 'recent',
        batchSelected: []
    });

    const toggleViewMode = (mode) => setViewMode(mode);

    const handleBatchAction = (action) => {
        if (filters.batchSelected.length === 0) return alert("No notes selected");
        alert(`${action} applied to ${filters.batchSelected.length} notes.`);
    };

    const toggleSelection = (id) => {
        setFilters((prev) => {
            const isSelected = prev.batchSelected.includes(id);
            const batchSelected = isSelected
                ? prev.batchSelected.filter((noteId) => noteId !== id)
                : [...prev.batchSelected, id];
            return { ...prev, batchSelected };
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-4">Notes Library</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search notes..."
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <select
                            className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filters.sort}
                            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                        >
                            <option value="recent">Sort by Recent</option>
                            <option value="popular">Sort by Popularity</option>
                            <option value="rating">Sort by Rating</option>
                        </select>
                        <button
                            className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm"
                            onClick={() => toggleViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        >
                            {viewMode === 'grid' ? <FaList /> : <FaTh />} {viewMode === 'grid' ? 'List View' : 'Grid View'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Your Notes</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleBatchAction('Delete')}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            <FaTrash /> Delete
                        </button>
                        <button
                            onClick={() => handleBatchAction('Share')}
                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            <FaShare /> Share
                        </button>
                        <button
                            onClick={() => handleBatchAction('Save')}
                            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                            <FaBookmark /> Save
                        </button>
                    </div>
                </div>

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {mockNotes.map((note) => (
                            <div key={note.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg relative">
                                <input
                                    type="checkbox"
                                    className="absolute top-4 right-4 w-5 h-5"
                                    onChange={() => toggleSelection(note.id)}
                                    checked={filters.batchSelected.includes(note.id)}
                                />
                                <h3 className="text-lg font-medium mb-2">{note.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{note.description}</p>
                                <div className="text-sm text-gray-500">{note.category}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {mockNotes.map((note) => (
                            <div key={note.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                                <div>
                                    <h3 className="text-lg font-medium">{note.title}</h3>
                                    <p className="text-gray-600 text-sm">{note.description}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5"
                                    onChange={() => toggleSelection(note.id)}
                                    checked={filters.batchSelected.includes(note.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const mockNotes = [
    { id: '1', title: 'Physics Basics', description: 'Introduction to Newtonian Mechanics', category: 'Science' },
    { id: '2', title: 'Algebra 101', description: 'Key concepts of Algebra', category: 'Mathematics' },
    { id: '3', title: 'World History Overview', description: 'Important events in the 20th century', category: 'History' },
];

export default NotesLibrary;
