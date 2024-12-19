const Product = require("../../models/products/productsSchema");
const driveService = require('../../driveAPI/googleDrive');
const User = require('../../models/users/usersSchema');

const deleteProduct = async (req, res) => {
    try {
        const  productId  = req.params.id;
        const product = await  Product.findById(productId);
        console.log(product);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        for (const imageUrl of product.images) {
            const fileId = imageUrl.split('id=')[1]; // Extract 
            await driveService.files.delete({
                fileId: fileId
            });
        }

        // Update user's products array
        await User.findByIdAndUpdate(product.sellerId, {
            $pull: { products: productId }
        });

        // Delete product from database
        await Product.findByIdAndDelete(productId);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message
        });
    }
};

exports.deleteProduct = deleteProduct;
