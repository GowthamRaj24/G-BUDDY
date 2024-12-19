const Product = require('../../models/products/productsSchema');


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .populate('sellerId', 'username email');

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('sellerId', 'username email');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching product",
            error: error.message
        });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category })
            .sort({ createdAt: -1 })
            .populate('sellerId', 'username email');

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching products by category",
            error: error.message
        });
    }
};

const getProductsBySeller = async (req, res) => {
    try {
        const products = await Product.find({ sellerId: req.params.sellerId })
            .sort({ createdAt: -1 })
            .populate('sellerId', 'username email');

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching seller's products",
            error: error.message
        });
    }
};


exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductsByCategory = getProductsByCategory;
exports.getProductsBySeller = getProductsBySeller;
