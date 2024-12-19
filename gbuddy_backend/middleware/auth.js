const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        token = token.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied"
            });
        }

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