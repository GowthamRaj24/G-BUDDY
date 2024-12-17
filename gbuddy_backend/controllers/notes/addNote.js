// const AWS = require('aws-sdk');
// const Notes = require('../../models/notesSchema');

// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });

// const addNotes = async (req, res) => {
//     try {
//         const fileParams = {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: `notes/${Date.now()}-${req.file.originalname}`,
//             Body: req.file.buffer,
//             ContentType: req.file.mimetype,
//             ACL: 'public-read'
//         };

//         const s3Upload = await s3.upload(fileParams).promise();
//         const fileUrl = s3Upload.Location;

//         const notes = await Notes.create({
//             title: req.body.title,
//             sem: req.body.sem,
//             userId: req.body.userId,
//             year: req.body.year,
//             branch: req.body.branch,
//             subject: req.body.subject,
//             unit: req.body.unit,
//             format: req.body.format,
//             description: req.body.description,
//             faculty: req.body.faculty || '',
//             documentUrl: fileUrl
//         });

//         res.status(201).json({
//             success: true,
//             data: notes,
//             message: "Notes added successfully"
//         });

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: "Failed to add notes",
//             error: error.message
//         });
//     }
// };

// exports.addNotes = addNotes;
