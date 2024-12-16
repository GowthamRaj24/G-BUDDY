const Notes = require('../../models/notesSchema');

const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find();
        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch notes",
            error: error.message
        });
    }
};

const getNotesByUser = async (req, res) => {
    try {
        const notes = await Notes.find({ userId: req.params.userId });
        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user notes",
            error: error.message
        });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        
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
        res.status(500).json({
            success: false,
            message: "Failed to fetch note",
            error: error.message
        });
    }
};

const searchNotes = async (req, res) => {
    const keyword = req.query.keyword;
    
    const searchResults = await Notes.find({
        $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { subject: { $regex: keyword, $options: 'i' } }
        ]
    });

    res.status(200).json({
        success: true,
        data: searchResults
    });
};


exports.searchNotes = searchNotes;
exports.getNoteById = getNoteById;
exports.getNotes = getNotes;
exports.getNotesByUser = getNotesByUser;
