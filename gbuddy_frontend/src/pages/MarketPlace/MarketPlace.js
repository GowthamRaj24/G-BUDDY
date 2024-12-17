import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaSlidersH, FaShoppingCart, FaHeart, FaFilter } from 'react-icons/fa';
import ProductCard from '../../components/ProductCard';

// Enhanced dummy data with better image placeholders
const dummyProducts = [
    {
        _id: '1',
        title: 'Data Structures and Algorithms Handbook',
        images: ['https://via.placeholder.com/800x600/2563eb/ffffff?text=DSA+Handbook'],
        description: 'Master competitive programming with this comprehensive guide covering all essential algorithms and data structures.',
        price: 299,
        sellerId: 'seller123',
        category: 'Books',
        status: 'available',
        rating: 4.5,
        reviews: 128,
        createdAt: new Date(),
        updatedAt: new Date()
    },
].concat(Array(11).fill(null).map((_, i) => ({
    _id: `${i + 2}`,
    title: `${['Advanced Calculus Notes', 'Computer Networks Guide', 'Machine Learning Basics', 'Web Development Course'][Math.floor(Math.random() * 4)]} ${i + 2}`,
    images: [`https://via.placeholder.com/800x600/${Math.random().toString(16).substr(-6)}/ffffff`],
    description: 'Comprehensive study material with detailed explanations and practice problems.',
    price: Math.floor(Math.random() * 1000) + 100,
    sellerId: `seller${i}`,
    category: ['Books', 'Notes', 'Study Materials', 'Electronics'][Math.floor(Math.random() * 4)],
    status: ['available', 'sold', 'reserved'][Math.floor(Math.random() * 3)],
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 200),
    createdAt: new Date(Date.now() - Math.random() * 10000000000),
    updatedAt: new Date()
})));

const categories = [
    { id: 'all', name: 'All', icon: '📚', color: 'emerald' },
    { id: 'books', name: 'Books', icon: '📖', color: 'blue' },
    { id: 'notes', name: 'Notes', icon: '📝', color: 'purple' },
    { id: 'study-materials', name: 'Study Materials', icon: '📓', color: 'pink' },
    { id: 'electronics', name: 'Electronics', icon: '💻', color: 'indigo' },
    { id: 'others', name: 'Others', icon: '🎯', color: 'gray' }
];

const Marketplace = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const productsPerPage = 6; // Changed to 6 for better grid layout

    // Filter and sort products
    const filteredProducts = dummyProducts
        .filter(product => 
            (selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory) &&
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            product.price >= priceRange[0] && product.price <= priceRange[1]
        )
        .sort((a, b) => {
            switch(sortBy) {
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                case 'rating': return b.rating - a.rating;
                default: return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handleQuickView = (product) => {
        // Implement quick view functionality
        console.log('Quick view:', product);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section with Glassmorphism */}
            <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-bold mb-6">Student Marketplace</h1>
                        <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
                            Discover and share educational resources with your fellow students
                        </p>
                        
                        {/* Enhanced Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search for books, notes, and more..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 focus:ring-4 focus:ring-emerald-300 focus:border-transparent shadow-lg"
                                />
                                <FaSearch className="absolute left-4 text-gray-400 text-xl" />
                                <button 
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="ml-4 p-4 bg-white text-emerald-600 rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg"
                                >
                                    <FaSlidersH className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Enhanced Filters Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`lg:w-72 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
                    >
                        {/* Categories */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold mb-6">Categories</h3>
                            <div className="space-y-3">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                                            selectedCategory === category.id
                                                ? 'bg-emerald-50 text-emerald-600 shadow-md'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <span className="text-2xl">{category.icon}</span>
                                        <span className="font-medium">{category.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Enhanced Price Range */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold mb-6">Price Range</h3>
                            <div className="space-y-6">
                                <input
                                    type="range"
                                    min="0"
                                    max="2000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                                <div className="flex items-center justify-between">
                                    <span className="px-4 py-2 bg-emerald-50 rounded-lg font-medium">₹{priceRange[0]}</span>
                                    <span className="px-4 py-2 bg-emerald-50 rounded-lg font-medium">₹{priceRange[1]}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Products Section */}
                    <div className="flex-1">
                        {/* Sort Controls */}
                        <div className="flex flex-wrap justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-lg">
                            <p className="text-gray-600">
                                Showing <span className="font-medium">{currentProducts.length}</span> of{' '}
                                <span className="font-medium">{filteredProducts.length}</span> products
                            </p>
                            <div className="flex items-center gap-4">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="p-2 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {currentProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onAddToCart={() => console.log('Added to cart:', product)}
                                    onToggleWishlist={() => console.log('Toggled wishlist:', product)}
                                    onQuickView={handleQuickView}
                                />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-center items-center gap-2 mt-12"
                            >
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-6 py-3 rounded-xl bg-white shadow-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-12 h-12 rounded-xl font-medium transition-all ${
                                            currentPage === page
                                                ? 'bg-emerald-500 text-white shadow-lg scale-110'
                                                : 'bg-white shadow hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-6 py-3 rounded-xl bg-white shadow-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                >
                                    Next
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
