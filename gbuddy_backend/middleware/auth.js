const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided"
            });
        }
        console.log(authHeader);

        const token = authHeader.split(' ')[1];
        const verified = jwt.verify(token, "JWT_SECRET");
        req.user = verified;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

exports.auth = auth;
