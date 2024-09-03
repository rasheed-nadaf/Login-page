const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;
