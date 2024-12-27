const Notes = require('../../models/notes/notesSchema');

const uploadToDrive = require('../../driveAPI/uploadToDrive');

const editNotes = async (req, res) => {
    try {
        let updateData = {
            title: req.body.title,
            sem: req.body.sem,
            subject: req.body.subject,
            unit: req.body.unit,
            description: req.body.description,
            faculty: req.body.faculty || '',
            branch: req.body.branch,
            relatedVideos: req.body.relatedVideos ? JSON.parse(req.body.relatedVideos) : []
        };

        // If new file is uploaded, update the document URL
        if (req.file) {
            const fileUrl = await uploadToDrive(req.file);
            updateData.documentUrl = fileUrl;
            updateData.format = req.file.mimetype;
        }

        const updatedNote = await Notes.findByIdAndUpdate(
            req.params.id,
            updateData,
            { 
                new: true,
                runValidators: true 
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedNote,
            message: "Note updated successfully"
        });

    } catch (error) {
        console.log("error in editNotes--", error.message);
        res.status(400).json({
            success: false,
            message: "Failed to update note",
            error: error.message
        });
    }
};

exports.editNotes = editNotes;