const User = require('../../models/userSchema');
const sendEmail = require('../../utils/sendEmail');

// Generate 6 digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const sendOTP = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        await sendEmail(
            user.email,
            "Your OTP Code",
            `Your OTP is: ${otp}`
        );

        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to send OTP",
            error: error.message
        });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            otp: req.body.otp,
            otpExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "OTP verification failed",
            error: error.message
        });
    }
};

exports.sendOTP = sendOTP;
exports.verifyOTP = verifyOTP;
