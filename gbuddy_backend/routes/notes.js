const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' ,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }});

const addNotes = require("../controllers/notes/addNote");
const fetchNotes = require("../controllers/notes/fetchNote.js");
const updateNotes = require("../controllers/notes/updateNote.js");
const deleteNotes = require("../controllers/notes/deleteNote.js");
const middleware = require("../middleware/auth")

const routes = express.Router();

routes
    .post("/addNotes",middleware.auth, upload.single('file'), addNotes.addNotes)
    .get("/searchNotes",middleware.auth, fetchNotes.searchNotes)
    .get("/fetchNotes",middleware.auth, fetchNotes.getNotes)
    .get("/fetchNotes/:id",middleware.auth, fetchNotes.getNoteById)
    .get("/fetchNotesByUser/:userId",middleware.auth, fetchNotes.getNotesByUser)
    .patch("/updateNotes", middleware.auth,updateNotes.updateNotes)
    .delete("/deleteNotes/:id",middleware.auth, deleteNotes.deleteNotes);


exports.route = routes;
