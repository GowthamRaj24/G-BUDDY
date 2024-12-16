const User = require('../../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const { password: userPassword, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            success: true,
            data: userWithoutPassword,
            token: token,
            message: "Login successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

exports.signin = signin;
