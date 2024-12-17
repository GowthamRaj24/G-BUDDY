// const AWS = require('aws-sdk');
// const User = require('../../models/userSchema');
// const bcrypt = require('bcrypt');

// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });

// const registerUser = async (req, res) => {
//     try {
//         let profileUrl = '';
        
//         if (req.file) {
//             const fileParams = {
//                 Bucket: process.env.AWS_BUCKET_NAME,
//                 Key: `profiles/${Date.now()}-${req.file.originalname}`,
//                 Body: req.file.buffer,
//                 ContentType: req.file.mimetype,
//                 ACL: 'public-read'
//             };

//             const s3Upload = await s3.upload(fileParams).promise();
//             profileUrl = s3Upload.Location;
//         }

//         const hashedPassword = await bcrypt.hash(req.body.password, 10);

//         const user = await User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: hashedPassword,
//             phone: req.body.phone,
//             profileUrl: profileUrl,
//             displayname: req.body.displayname,
//             description: req.body.description,
//             campus: req.body.campus,
//             branch: req.body.branch,
//             year: req.body.year,
//             rollnumber: req.body.rollnumber,
//             linkedin: req.body.linkedin,
//             github: req.body.github,
//             leetcode: req.body.leetcode,
//             semester: req.body.semester
//         });

//         const { password, ...userWithoutPassword } = user.toObject();

//         res.status(201).json({
//             success: true,
//             data: userWithoutPassword,
//             message: "User registered successfully"
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: "Registration failed",
//             error: error.message
//         });
//     }
// };

// exports.registerUser = registerUser;
