const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Delete images from Google Drive
        for (const imageUrl of product.images) {
            const fileId = imageUrl.match(/[-\w]{25,}/)[0];
            await deleteFromDrive(fileId);
        }

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