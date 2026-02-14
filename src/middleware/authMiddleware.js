const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log('[Auth Middleware] All request headers:', req.headers);
    
    // Get token from header - support both x-auth-token and Authorization Bearer
    let token = req.header('x-auth-token');
    
    if (!token) {
        const authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.slice(7); // Remove 'Bearer ' prefix
        }
    }

    // Check if no token
    if (!token) {
        console.log('[Auth Middleware] No token found in request');
        return res.status(401).json({ msg: 'No token, authorization denied', headers: req.headers });
    }

    // Verify token
    try {
        console.log('[Auth Middleware] Verifying token...');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('[Auth Middleware] Token verified successfully');
        next();
    } catch (err) {
        console.log('[Auth Middleware] Token verification failed:', err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
