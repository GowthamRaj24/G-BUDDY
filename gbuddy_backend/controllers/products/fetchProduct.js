// const Product = require('../../models/productSchema');

// const getProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json({
//             success: true,
//             count: products.length,
//             data: products
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch products",
//             error: error.message
//         });
//     }
// };

// const getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
        
//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: product
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch product",
//             error: error.message
//         });
//     }
// };

// const getProductsBySeller = async (req, res) => {
//     try {
//         const products = await Product.find({ sellerId: req.params.sellerId });
//         res.status(200).json({
//             success: true,
//             count: products.length,
//             data: products
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch seller products",
//             error: error.message
//         });
//     }
// };

// const searchProduct = async (req, res) => {
//     const keyword = req.query.keyword;
    
//     const searchResults = await Product.find({
//         $or: [
//             { title: { $regex: keyword, $options: 'i' } },
//             { description: { $regex: keyword, $options: 'i' } },
//             { category: { $regex: keyword, $options: 'i' } }
//         ]
//     });

//     res.status(200).json({
//         success: true,
//         data: searchResults
//     });
// };


// exports.searchProduct = searchProduct;
// exports.getProducts = getProducts;
// exports.getProductById = getProductById;
// exports.getProductsBySeller = getProductsBySeller;
