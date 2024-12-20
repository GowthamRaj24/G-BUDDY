import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../backendURL';

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        images: [],
        description: '',
        price: '',
        category: '',
        status: 'available',
        sellerId: JSON.parse(localStorage.getItem('user'))._id
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [imageError, setImageError] = useState('');

    const categories = [
        { id: 'books', name: 'Books' },
        { id: 'notes', name: 'Notes' },
        { id: 'study-materials', name: 'Study Materials' },
        { id: 'electronics', name: 'Electronics' },
        { id: 'others', name: 'Others' }
    ];

    const validateForm = () => {
        const newErrors = {};
        
        if (formData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters long';
        }
        if (imageFiles.length === 0) {
            newErrors.images = 'At least one image is required';
        } else if (imageFiles.length > 5) {
            newErrors.images = 'Maximum 5 images allowed';
        }
        if (formData.description.length < 20) {
            newErrors.description = 'Description must be at least 20 characters long';
        }
        if (formData.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImageError('');

        const validFiles = files.filter(file => {
            const isValid = file.type.startsWith('image/');
            const isValidSize = file.size <= 5 * 1024 * 1024;
            
            if (!isValid) setImageError('Only image files are allowed');
            if (!isValidSize) setImageError('Images must be less than 5MB');
            
            return isValid && isValidSize;
        });

        if (imageFiles.length + validFiles.length > 5) {
            setImageError('Maximum 5 images allowed');
            return;
        }

        const newImageFiles = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substring(7)
        }));

        setImageFiles(prevFiles => [...prevFiles, ...newImageFiles]);
        
        const formDataImages = new FormData();
        validFiles.forEach(file => {
            formDataImages.append('images', file);
        });

        setFormData(prevData => ({
            ...prevData,
            images: [...(prevData.images || []), ...validFiles]
        }));
    };

    useEffect(() => {
        return () => {
            imageFiles.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [imageFiles]);

    const removeImage = (index) => {
        const newImageFiles = [...imageFiles];
        URL.revokeObjectURL(newImageFiles[index].preview);
        newImageFiles.splice(index, 1);
        setImageFiles(newImageFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('sellerId', formData.sellerId);
            formDataToSend.append('status', formData.status);

            formData.images.forEach(image => {
                formDataToSend.append('images', image);
            });

            const response = await axios.post(
                BACKEND_URL+"/products/addProduct", 
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                navigate('/marketplace');
            }
        } catch (error) {
            console.error('Error uploading product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Product</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.title ? 'border-red-500' : ''} focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                                placeholder="Enter product title"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Images
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="flex flex-col items-center justify-center cursor-pointer"
                                >
                                    <FaCloudUploadAlt className="w-12 h-12 text-gray-400" />
                                    <span className="mt-2 text-sm text-gray-500">
                                        Click to upload images
                                    </span>
                                </label>
                            </div>
                            
                            {imageError && (
                                <p className="mt-1 text-sm text-red-500">{imageError}</p>
                            )}
                            {errors.images && (
                                <p className="mt-1 text-sm text-red-500">{errors.images}</p>
                            )}
                            
                            {imageFiles.length > 0 && (
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {imageFiles.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={image.preview}
                                                alt={`Preview ${index}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <FaTrash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                rows={4}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : ''} focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                                placeholder="Describe your product"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.price ? 'border-red-500' : ''} focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                                placeholder="Enter price"
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-emerald-500 text-white py-4 rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
                        >
                            {isSubmitting ? 'Publishing...' : 'Publish Product'}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddProduct;
