const express = require("express");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });



const addNotes = require("../controllers/notes/addNote");
const fetchNotes = require("../controllers/notes/fetchNote.js");
const contributeVideo = require("../controllers/notes/contributeVideo.js");
const deleteNote = require("../controllers/notes/deleteNote.js");

const routes = express.Router();

routes
    .post("/addNotes", upload.single("file"), addNotes.addNotes)
    .get("/searchNotes", fetchNotes.getAllNotes)
    .get("/fetchAllNotes",fetchNotes.getAllNotes)
    .get("/:noteId", fetchNotes.getNoteById)
    .get("/fetchbyUser/:userId", fetchNotes.getNotesByUser)
    .post("/getSavedNotes" ,fetchNotes.getSavedNotes)
    .post("/saveNote", addNotes.saveNote)
    .post("/contributeVideo", contributeVideo.contributeVideo)
    .post("/getLatestNotes", fetchNotes.getLatestNotes)
    .post("/searchNotes",fetchNotes.searchNotes)
    .delete("/deleteNote/:id", deleteNote.deleteNote);  

    
exports.route = routes;
