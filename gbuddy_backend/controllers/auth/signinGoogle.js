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
                authProvider: 'google'
            });
        }
        
        const token = jwt.sign(
            { userId: user._id },
            "JWT_SECRET",
        );
        
        res.status(200).json({
            success: true,
            message: "Successfully logged in with Google",
            token,
            data: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
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