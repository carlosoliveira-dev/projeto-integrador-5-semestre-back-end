const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // The token usually comes in the format "Bearer YOUR_TOKEN"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token not provided.' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        
        // Attach the decoded user payload to the request object for later use
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
}

module.exports = {
    verifyToken,
}