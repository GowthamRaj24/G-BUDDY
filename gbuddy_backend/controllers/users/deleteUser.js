const User = require('../../models/userSchema');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user.profileUrl) {
            const key = user.profileUrl.split('.com/')[1];
            await s3.deleteObject({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key
            }).promise();
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
};

exports.deleteUser = deleteUser;
