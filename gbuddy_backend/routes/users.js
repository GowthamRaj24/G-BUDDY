const express = require('express');
const multer = require('multer');
const updateUser = require('../controllers/users/updateUser');
const upload = multer({ dest: 'uploads/' ,
    limits: {
        fileSize: 5 * 1024 * 1024
    }});

const fetchUser = require('../controllers/users/fetchUser');
const routes = express.Router();

routes
    .get("/fetchUser/:id", fetchUser.getUser)
    .put('/updateProfile/:userId' , updateUser.updateUser)

exports.route = routes;
