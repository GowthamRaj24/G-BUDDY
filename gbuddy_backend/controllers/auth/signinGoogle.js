const User = require('../../models/users/usersSchema');
const jwt = require("jsonwebtoken");

const signinGoogle = async (req, res) => {
    try {
        const { googleUser } = req.body;
        
        let user = await User.findOne({ email: googleUser.email });
        
        if (!user) {
            user = await User.create({
                email: googleUser.email,
                username: googleUser.name,
                profilePicture: googleUser.picture,
                authProvider: 'google',
                savedFiles : [],
                campus: "",
                branch: "",
                year: "",
                rollnumber: "",
                linkedin: "",
                github: "",
                leetcode: "",
                semester: ""
            })

            const token = jwt.sign(
                { userId: user._id },
                "JWT_SECRET",
            );
            user = await User.findOne({ email: user.email });

            return res.status(200).json({
                success: true,
                message: "Successfully logged in with Google",
                token,
                data: user
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            "JWT_SECRET",
        );
        
        return res.status(200).json({
            success: true,
            message: "Successfully logged in with Google",
            token,
            data: user
        });
        
    } catch (error) {
        console.error('Google signin error:', error);
        res.status(500).json({
            success: false,
            message: "Google authentication failed"
        });
    }
};


exports.signinGoogle = signinGoogle;