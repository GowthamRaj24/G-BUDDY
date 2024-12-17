import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaStar, FaGithub, FaLinkedin , FaWhatsapp} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

const ProductView = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(0);

    // Example product data with seller details matching the schema
    const product = {
        _id: '1',
        title: 'Data Structures and Algorithms Handbook',
        images: [
            'https://via.placeholder.com/800x600/2563eb/ffffff?text=DSA+Main',
            'https://via.placeholder.com/800x600/2563eb/ffffff?text=DSA+2',
            'https://via.placeholder.com/800x600/2563eb/ffffff?text=DSA+3',
        ],
        description: 'Master competitive programming with this comprehensive guide covering all essential algorithms and data structures. Perfect for interview preparation and competitive coding.',
        price: 299,
        category: 'Books',
        status: 'available',
        rating: 4.5,
        reviews: 128,
        specifications: [
            { label: 'Condition', value: 'New' },
            { label: 'Pages', value: '450' },
            { label: 'Language', value: 'English' },
            { label: 'Author', value: 'John Doe' },
            { label: 'Edition', value: '2023' }
        ],
        seller: {
            username: 'johnsmith',
            displayname: 'John Smith',
            email: 'john@example.com',
            campus: 'Main Campus',
            branch: 'Computer Science',
            year: 3,
            semester: 6,
            score: 450,
            github: 'https://github.com/johnsmith',
            linkedin: 'https://linkedin.com/in/johnsmith',
            leetcode: 'https://leetcode.com/johnsmith'
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                        <FaArrowLeft />
                        <span>Back to Marketplace</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden bg-white shadow-lg">
                            <img 
                                src={product.images[selectedImage]}
                                alt={product.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-w-1 aspect-h-1 rounded-xl overflow-hidden ${
                                        selectedImage === index ? 'ring-2 ring-emerald-500' : ''
                                    }`}
                                >
                                    <img 
                                        src={image}
                                        alt={`${product.title} ${index + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Details Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        {/* Title and Basic Info */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-emerald-600 font-medium">{product.category}</span>
                            </div>
                        </div>

                        {/* Price and Buy Now */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-emerald-600">₹{product.price}</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-emerald-500 text-white px-6 py-4 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg font-medium text-lg"
                            >
                                Buy Now
                            </motion.button>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Description</h2>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Specifications */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Specifications</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {product.specifications.map((spec, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="text-gray-500">{spec.label}</span>
                                        <span className="font-medium">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Enhanced Seller Information */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Seller Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl">
                                        {product.seller.displayname.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg">{product.seller.displayname}</h3>
                                        <p className="text-gray-500">{product.seller.branch}</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                    <div>
                                        <p className="text-gray-500">Campus</p>
                                        <p className="font-medium">{product.seller.campus}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Year</p>
                                        <p className="font-medium">{product.seller.year}rd Year</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Semester</p>
                                        <p className="font-medium">{product.seller.semester}th Semester</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Score</p>
                                        <p className="font-medium">{product.seller.score} points</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <a 
                                        href={`https://wa.me/${product.seller.phone}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-full bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <FaWhatsapp className="w-5 h-5" />
                                        Contact Seller
                                    </a>
                                </div>


                                <div className="flex gap-4 pt-4 border-t">
                                    {product.seller.github && (
                                        <a href={product.seller.github} target="_blank" rel="noopener noreferrer" 
                                           className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <FaGithub className="w-6 h-6" />
                                        </a>
                                    )}
                                    {product.seller.linkedin && (
                                        <a href={product.seller.linkedin} target="_blank" rel="noopener noreferrer"
                                           className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <FaLinkedin className="w-6 h-6 text-blue-600" />
                                        </a>
                                    )}
                                    {product.seller.leetcode && (
                                        <a href={product.seller.leetcode} target="_blank" rel="noopener noreferrer"
                                           className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <SiLeetcode className="w-6 h-6 text-orange-500" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
