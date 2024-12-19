const express = require("express");
const multer = require('multer');
const upload = multer({ 
    dest: 'uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});


const addNotes = require("../controllers/notes/addNote");
const fetchNotes = require("../controllers/notes/fetchNote.js");
const contributeVideo = require("../controllers/notes/contributeVideo.js");
const deleteNote = require("../controllers/notes/deleteNote.js");

const middleware = require("../middleware/auth");

const routes = express.Router();

routes
    .post("/addNotes",middleware.auth, upload.single("file"), addNotes.addNotes)
    .get("/searchNotes",middleware.auth, fetchNotes.getAllNotes)
    .get("/fetchAllNotes", middleware.auth,fetchNotes.getAllNotes)
    .get("/:noteId",middleware.auth, fetchNotes.getNoteById)
    .get("/fetchbyUser/:userId",middleware.auth, fetchNotes.getNotesByUser)
    .post("/getSavedNotes" , middleware.auth,fetchNotes.getSavedNotes)
    .post("/saveNote",middleware.auth, addNotes.saveNote)
    .post("/contributeVideo",middleware.auth, contributeVideo.contributeVideo)
    .post("/getLatestNotes", middleware.auth,fetchNotes.getLatestNotes)
    .post("/searchNotes", middleware.auth,fetchNotes.searchNotes)
    .delete("/deleteNote/:id",middleware.auth, deleteNote.deleteNote);  

    
exports.route = routes;
