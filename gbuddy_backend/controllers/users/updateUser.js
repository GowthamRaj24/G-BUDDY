const User = require('../../models/userSchema');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const updateUser = async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.file) {
            const fileParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `profiles/${Date.now()}-${req.file.originalname}`,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
                ACL: 'public-read'
            };

            const s3Upload = await s3.upload(fileParams).promise();
            updateData.profileUrl = s3Upload.Location;
        }

        const user = await User.findByIdAndUpdate(
            req.userData.userId,  // From auth middleware
            {
                displayname: req.body.displayname,
                description: req.body.description,
                campus: req.body.campus,
                branch: req.body.branch,
                year: req.body.year,
                rollnumber: req.body.rollnumber,
                linkedin: req.body.linkedin,
                github: req.body.github,
                leetcode: req.body.leetcode,
                semester: req.body.semester,
                profileUrl: updateData.profileUrl
            },
            { new: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            data: user,
            message: "Profile updated successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update profile",
            error: error.message
        });
    }
};

exports.updateUser = updateUser;
