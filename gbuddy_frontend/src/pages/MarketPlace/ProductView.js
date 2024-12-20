import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaStar, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../backendURL';

const ProductView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [seller, setSeller] = useState(null);

    useEffect(() => {
        if (product?.sellerId) {
            fetchSellerDetails();
        }
    }, [product]);

    const fetchSellerDetails = async () => {
    try {
        const response = await axios.get(BACKEND_URL+`/users/fetchUser/${product.sellerId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
      });
        setSeller(response.data.data);
    } catch (error) {
        console.log('Error fetching seller details:', error);
    }
};

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(BACKEND_URL+`/products/getProduct/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          });
            setProduct(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
                    <button 
                        onClick={() => navigate('/marketplace')}
                        className="mt-4 text-emerald-600 hover:text-emerald-700"
                    >
                        Return to Marketplace
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
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

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden bg-white shadow-lg">
                            <img 
                                src={`https://lh3.googleusercontent.com/d/${product.images[selectedImage].split('id=')[1]}`}
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
                                        src={`https://lh3.googleusercontent.com/d/${image.split('id=')[1]}`}
                                        alt={`${product.title} ${index + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-emerald-600 font-medium">{product.category}</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-emerald-600">₹{product.price}</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.location.href = `https://wa.me/+91${seller?.phone}`}
                                className="w-full bg-emerald-500 text-white px-6 py-4 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg font-medium text-lg"
                            >
                                Contact Seller
                            </motion.button>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Description</h2>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>

                        {seller && (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Seller Information</h2>
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl">
                    {seller.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="font-medium text-lg">{seller.username}</h3>
                    <p className="text-gray-500">{seller.email}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{seller.phone}</p>
                </div>
                <div>
                    <p className="text-gray-500">Member Since</p>
                    <p className="font-medium">{new Date(seller.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="pt-4 border-t">
                <a 
                    href={`https://wa.me/+91${seller.phone}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                    <FaWhatsapp className="w-5 h-5" />
                    Contact Seller
                </a>
            </div>
        </div>
    </div>
)}


                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
