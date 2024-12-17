import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingCart, FaClock, FaCheck, FaEye } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const ProductCard = ({ 
    product, 
    onAddToCart, 
    onToggleWishlist,
    onQuickView, 
    isWishlisted = false 
}) => {
    const {
        title,
        images,
        description,
        price,
        status,
        category,
        createdAt
    } = product;

    const statusConfig = {
        available: { color: 'emerald', icon: FaCheck, text: 'Available' },
        sold: { color: 'red', icon: FaShoppingCart, text: 'Sold' },
        reserved: { color: 'yellow', icon: FaClock, text: 'Reserved' }
    };

    const onBuyNow = (product) => {
        if (status === 'available') {
            window.location.href = `/marketplace/product/`
            console.log('Buying product:', product);
        }
    };
    const StatusIcon = statusConfig[status].icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-t-2xl aspect-[4/3]">
                <img
                    src={images[0]}
                    alt={title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onToggleWishlist(product)}
                            className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                            {isWishlisted ? (
                                <FaHeart className="w-5 h-5 text-red-500" />
                            ) : (
                                <FaRegHeart className="w-5 h-5 text-gray-700" />
                            )}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onQuickView(product)}
                            className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                            <FaEye className="w-5 h-5 text-gray-700" />
                        </motion.button>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    <span className={`
                        px-4 py-2 rounded-full text-sm font-medium
                        bg-${statusConfig[status].color}-100 
                        text-${statusConfig[status].color}-700
                        flex items-center gap-2 shadow-lg
                    `}>
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[status].text}
                    </span>
                </div>

                {/* Category Tag */}
                <div className="absolute bottom-4 left-4">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-lg">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-gray-800 text-lg line-clamp-1 group-hover:text-emerald-600 transition-colors">
                            {title}
                        </h3>
                        <span className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {description}
                    </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Price</span>
                    <span className="text-2xl font-bold text-emerald-600">
                        ₹{price.toLocaleString()}
                    </span>
                </div>
                {status === 'available' && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onBuyNow(product)}
                        className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-lg font-medium"
                    >
                        Buy Now
                    </motion.button>
                )}
            </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
