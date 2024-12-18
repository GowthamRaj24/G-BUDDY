const Notes = require('../../models/notes/notesSchema');
const uploadToDrive = require('../../driveAPI/uploadToDrive');
const usersSchema = require('../../models/users/usersSchema');

const addNotes = async (req, res) => {
    try {
        console.log("received file:", req.file);
        const fileUrl = await uploadToDrive(req.file);

        const notes = await Notes.create({
            title: req.body.title,
            sem: req.body.sem,
            userId: req.body.userId,
            subject: req.body.subject,
            unit: req.body.unit,
            format: req.body.format,
            description: req.body.description,
            faculty: req.body.faculty || '',
            documentUrl: fileUrl
        });

        res.status(201).json({
            success: true,
            data: notes,
            message: "Notes added successfully"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to add notes",
            error: error.message
        });
    }
};


const saveNote = async (req, res) => {
    try {
        const { noteId, userId } = req.body;
        
        const user = await usersSchema.findById(userId);
        if (!user.savedNotes.includes(noteId)) {
            await usersSchema.findByIdAndUpdate(
            userId,
            { $push: { savedNotes: noteId } },
            { new: true }
            );
            return res.status(200).json({
                success: true,
                message: "Note saved successfully"
            });
        }
        else{
            await usersSchema.findByIdAndUpdate(
            userId,
            { $pull: { savedNotes: noteId } },
            { new: true }
            );
            return res.status(200).json({
                success: true,
                message: "Note Removed from Save successfully"
            });
        }


        

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to save note",
            error: error.message
        });
    }
};


exports.addNotes = addNotes;
exports.saveNote = saveNote;
