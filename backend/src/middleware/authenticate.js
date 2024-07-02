const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.send('token is required')
    }
    const token = authHeader.split(' ')[1];
    if (token) {
        try {
            const decode = jwt.decode(token, 'is4myar2x');
            req.user = decode;
            next()
        } catch (error) {
            return res.status(401).send("Invalid Token");
        }
    } else {
        res.status(403).json({ message: 'A token is required' })
    }
}

module.exports = { verifyToken }