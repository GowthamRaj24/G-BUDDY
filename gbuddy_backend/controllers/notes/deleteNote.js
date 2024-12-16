const Notes = require('../../models/notesSchema');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const deleteNotes = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        
        const key = note.documentUrl.split('.com/')[1];
        await s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        }).promise();

        await Notes.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Notes deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete notes",
            error: error.message
        });
    }
};

exports.deleteNotes = deleteNotes;
