import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        images: [],
        description: '',
        price: '',
        category: '',
        status: 'available'
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        { id: 'books', name: 'Books' },
        { id: 'notes', name: 'Notes' },
        { id: 'study-materials', name: 'Study Materials' },
        { id: 'electronics', name: 'Electronics' },
        { id: 'others', name: 'Others' }
    ];

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImageFiles = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setImageFiles([...imageFiles, ...newImageFiles]);
    };

    const removeImage = (index) => {
        const newImageFiles = [...imageFiles];
        URL.revokeObjectURL(newImageFiles[index].preview);
        newImageFiles.splice(index, 1);
        setImageFiles(newImageFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Here you would typically:
        // 1. Upload images to storage
        // 2. Get image URLs
        // 3. Submit product data to your API
        // 4. Handle response and redirect

        setIsSubmitting(false);
        navigate('/marketplace');
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
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                placeholder="Enter product title"
                            />
                        </div>

                        {/* Image Upload */}
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
                            
                            {/* Image Previews */}
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

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                placeholder="Describe your product"
                            />
                        </div>

                        {/* Price */}
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
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                placeholder="Enter price"
                            />
                        </div>

                        {/* Category */}
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

                        {/* Submit Button */}
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
