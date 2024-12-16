const Notes = require('../../models/notesSchema');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const updateNotes = async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.file) {
            const fileParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `notes/${Date.now()}-${req.file.originalname}`,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
                ACL: 'public-read'
            };

            const s3Upload = await s3.upload(fileParams).promise();
            updateData.documentUrl = s3Upload.Location;
        }

        const notes = await Notes.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: notes,
            message: "Notes updated successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update notes",
            error: error.message
        });
    }
};

exports.updateNotes = updateNotes;
