const Notes = require('../../models/notes/notesSchema');

const contributeVideo = async (req, res) => {
    try {
        const { noteId, videoTitle, videoUrl } = req.body;
        
        const video = {
            title: videoTitle,
            url: videoUrl,
            timestamp: new Date()
        };

        const updatedNote = await Notes.findByIdAndUpdate(
            noteId,
            { $push: { relatedVideos: video } },
            { new: true }
        ).sort({ 'relatedVideos.timestamp': -1 });

        res.status(200).json({
            success: true,
            data: updatedNote,
            message: "Video contributed successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to contribute video",
            error: error.message
        });
    }
};

exports.contributeVideo = contributeVideo;
