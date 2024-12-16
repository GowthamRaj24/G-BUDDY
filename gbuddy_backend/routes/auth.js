const express = require('express');

const signup = require("../controllers/auth/signup");
const signin = require('../controllers/auth/signin');
const emailVerification = require('../controllers/auth/emailVerification')
const forgotPassword = require("../controllers/auth/forgotPassword")


const routes = express.Router();

routes
    .post("/signup", signup.signup)
    .post("/signin", signin.signin)
    .post("/sendOTP", emailVerification.sendOTP)
    .post("/verifyOTP" , emailVerification.verifyOTP)
    .post("/forgotPassword" , forgotPassword.forgotPassword)
    .post("/resetPassword" , forgotPassword.resetPassword)

exports.route = routes;
