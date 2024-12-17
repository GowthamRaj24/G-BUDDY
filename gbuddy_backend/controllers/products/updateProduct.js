// const Product = require('../../models/productSchema');
// const AWS = require('aws-sdk');

// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });

// const updateProduct = async (req, res) => {
//     try {
//         let updateData = { ...req.body };

//         if (req.files && req.files.length > 0) {
//             const imageUrls = [];
//             for (const file of req.files) {
//                 const fileParams = {
//                     Bucket: process.env.AWS_BUCKET_NAME,
//                     Key: `products/${Date.now()}-${file.originalname}`,
//                     Body: file.buffer,
//                     ContentType: file.mimetype,
//                     ACL: 'public-read'
//                 };

//                 const s3Upload = await s3.upload(fileParams).promise();
//                 imageUrls.push(s3Upload.Location);
//             }
//             updateData.images = imageUrls;
//         }

//         const product = await Product.findByIdAndUpdate(
//             req.params.id,
//             updateData,
//             { new: true }
//         );

//         res.status(200).json({
//             success: true,
//             data: product,
//             message: "Product updated successfully"
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: "Failed to update product",
//             error: error.message
//         });
//     }
// };

// exports.updateProduct = updateProduct;
