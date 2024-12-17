// const AWS = require('aws-sdk');
// const Product = require('../../models/productSchema');

// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });

// const addProduct = async (req, res) => {
//     try {
//         const imageUrls = [];
        
//         // Upload multiple images to S3
//         for (const file of req.files) {
//             const fileParams = {
//                 Bucket: process.env.AWS_BUCKET_NAME,
//                 Key: `products/${Date.now()}-${file.originalname}`,
//                 Body: file.buffer,
//                 ContentType: file.mimetype,
//                 ACL: 'public-read'
//             };

//             const s3Upload = await s3.upload(fileParams).promise();
//             imageUrls.push(s3Upload.Location);
//         }

//         const product = await Product.create({
//             title: req.body.title,
//             images: imageUrls,
//             description: req.body.description,
//             price: req.body.price,
//             sellerId: req.body.sellerId,
//             category: req.body.category
//         });

//         res.status(201).json({
//             success: true,
//             data: product,
//             message: "Product added successfully"
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: "Failed to add product",
//             error: error.message
//         });
//     }
// };

// exports.addProduct = addProduct;
