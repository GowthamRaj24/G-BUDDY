const Notes = require('../../models/notes/notesSchema');

const getNoteById = async (req, res) => {
    try {
        console.log(req.params.noteId);
        const note = await Notes.findById(req.params.noteId);
        
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            data: note
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch note",
            error: error.message
        });
    }
};

const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch notes",
            error: error.message
        });
    }
};

const getNotesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notes = await Notes.find({ userId: userId })
            .sort({ createdAt: -1 })
            .lean();

        console.log("Found notes:", notes);
        
        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch user notes",
            error: error.message
        });
    }
};


const getSavedNotes = async (req, res) => {
    try {
        const { noteIds } = req.body;
        console.log(noteIds);
        const notes = await Notes.find({
            '_id': { $in: noteIds }
        });
        
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch saved notes",
            error: error.message
        });
    }
};




const getLatestNotes =  async (req, res) => {
    try {
        const notes = await Notes.find().sort({ createdAt: -1 })
            .limit(3);
        
        res.status(200).json({
            success: true,
            data: notes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


const searchNotes = async (req, res) => {
    try {
        console.log(req.body.filter);
        const notes = await Notes.find({
            $or: [
                { title: { $regex: req.body.filter, $options: 'i' } },
                { subject: { $regex: req.body.filter, $options: 'i' } },
                { faculty: { $regex: req.body.filter, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: notes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.getLatestNotes = getLatestNotes;
exports.getSavedNotes = getSavedNotes;
exports.searchNotes = searchNotes;
exports.getNoteById = getNoteById;
exports.getAllNotes = getAllNotes;
exports.getNotesByUser = getNotesByUser;
