const User = require('../../models/users/usersSchema');
const sendEmail = require('../../utils/sendEmail');

// Generate 6 digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const sendOTP = async (req, res) => {
    try {
        const otp = generateOTP();

        await sendEmail(
            req.body.email,
            "WELCOME TO G-BUDDY | Your OTP Code",
            `Your OTP is: ${otp}`
        );

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp : otp
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to send OTP",
            error: error.message
        });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const user = {
            email : req.body.email,
            enteredotp: req.body.enteredotp,
            sentotp : req.body.sentotp
        }

        if (user.enteredotp != user.sentotp) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }


        res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "OTP verification failed",
            error: error.message
        });
    }
};

exports.sendOTP = sendOTP;
exports.verifyOTP = verifyOTP;
