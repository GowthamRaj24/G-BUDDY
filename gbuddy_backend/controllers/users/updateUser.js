const express = require('express');
const router = express.Router();
const User = require('../../models/users/usersSchema');



const updateUser = async (req, res) => {
        try {
            const updates = {
                username: req.body.username,
                displayname: req.body.displayname,
                description: req.body.description,
                campus: req.body.campus,
                branch: req.body.branch,
                year: req.body.year,
                rollnumber: req.body.rollnumber,
                linkedin: req.body.linkedin,
                github: req.body.github,
                leetcode: req.body.leetcode,
                semester: req.body.semester,
                phone: req.body.phone
            };
    
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $set: updates },
                { new: true }
            );
    
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
    
            res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                data: user
            });
    
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Failed to update profile",
                error: error.message
            });
        }
    };


exports.updateUser = updateUser;