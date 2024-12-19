const User = require('../../models/users/usersSchema');
const bcrypt = require('bcrypt');
const sendEmail = require('../../utils/sendEmail');

const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        const otp = generateOTP();
        user.resetOTP = otp;
        user.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        await sendEmail(
            user.email,
            "Password Reset OTP",
            `Your password reset OTP is: ${otp}`
        );

        res.status(200).json({
            success: true,
            message: "Reset OTP sent successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to send reset OTP",
            error: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Password reset failed",
            error: error.message
        });
    }
};

exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
