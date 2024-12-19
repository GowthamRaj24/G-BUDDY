const Product = require('../../models/products/productsSchema');
const uploadToDrive = require('../../driveAPI/uploadToDrive');

const addProduct = async (req, res) => {
    try {
        // console.log(req.body)
        // console.log(req.files)
        const imageUrls = await Promise.all(
            req.files.map(file => uploadToDrive(file))
        );

        const product = await Product.create({
            title: req.body.title,
            images: imageUrls,
            description: req.body.description,
            price: req.body.price,
            sellerId: req.body.sellerId,
            category: req.body.category
        });

        res.status(201).json({
            success: true,
            data: product,
            message: "Product added successfully"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to add product",
            error: error.message
        });
    }
};

exports.addProduct = addProduct;