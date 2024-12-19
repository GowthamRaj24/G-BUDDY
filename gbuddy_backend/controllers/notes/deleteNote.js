const Notes = require('../../models/notes/notesSchema');
const driveService = require('../../driveAPI/googleDrive');

const deleteNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        // Extract file ID from Google Drive URL
        const fileId = note.documentUrl.split('/')[5];

        // Delete file from Google Drive
        await driveService.files.delete({
            fileId: fileId
        });

        // Delete note from database
        await Notes.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to delete note",
            error: error.message
        });
    }
};

exports.deleteNote = deleteNote;
