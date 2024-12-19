const User = require('../../models/users/usersSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET= 123000; 


const signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(req.body.phone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number format"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            username: req.body.username,
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            phone: req.body.phone
        });
        
        console.log("Created User: ", user._id);
        try{
            const token = jwt.sign({ userId: user._id } , "JWT_SECRET", { expiresIn: '24h' });
            console.log(token);
            const { password, ...userWithoutPassword } = user.toObject();
            console.log(userWithoutPassword);

            res.status(201).json({
                success: true,
                userdata: userWithoutPassword,
                token: token,
                message: "Registration successful"
            });
        }
        catch(err){
            console.log(err);
        }
    

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
};

exports.signup = signup;
