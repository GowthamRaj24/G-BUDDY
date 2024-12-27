import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFile } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../backendURL';

const EditNotes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        sem: '',
        unit: '',
        faculty: '',
        branch: '',
        file: null,
        relatedVideos: []
    });

    useEffect(() => {
        fetchNoteDetails();
    }, [id]);

    const fetchNoteDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const noteData = response.data.data;
            setFormData({
                title: noteData.title || '',
                description: noteData.description || '',
                subject: noteData.subject || '',
                sem: noteData.sem || '',
                unit: noteData.unit || '',
                faculty: noteData.faculty || '',
                file: null,
                relatedVideos: noteData.relatedVideos || []
            });
        } catch (error) {
            toast.error('Failed to fetch note details');
            navigate('/notes');
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.title || !formData.subject || !formData.unit || !formData.description) {
            setLoading(false);
            return toast.error('Please fill all required fields');
        }

        const formDataToSend = new FormData();
        if (formData.file) {
            formDataToSend.append('file', formData.file);
        }
        
        // Append all form fields
        Object.keys(formData).forEach(key => {
            if (key !== 'file' && formData[key] !== null) {
                if (key === 'relatedVideos') {
                    formDataToSend.append(key, JSON.stringify(formData[key]));
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
        });

        try {
            await axios.put(
                `${BACKEND_URL}/notes/updateNote/${id}`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            toast.success('Note updated successfully');
            navigate('/notes');
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message || 'Failed to update note');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <ToastContainer />
            <div className="max-w-4xl mx-auto px-6">
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm p-8"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Note</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    title: e.target.value
                                }))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>



                        {/* Subject Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    subject: e.target.value
                                }))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>


                        {/* Faculty Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Faculty
                            </label>
                            <input
                                type="text"
                                value={formData.faculty}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    faculty: e.target.value
                                }))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        {/* Unit Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Unit
                            </label>
                            <select
                                value={formData.unit}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    unit: e.target.value
                                }))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                                required
                            >
                                <option value="">Select Unit</option>
                                {[1,2,3,4,5].map(unit => (
                                    <option key={unit} value={unit}>
                                        Unit {unit}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Description Field */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    description: e.target.value
                                }))}
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>

                        {/* File Upload Field */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Update PDF (Optional)
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file && file.type === 'application/pdf') {
                                        setFormData(prev => ({ ...prev, file }));
                                    } else {
                                        toast.error('Please upload a PDF file');
                                    }
                                }}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/notes')}
                            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update Note'}
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default EditNotes;
