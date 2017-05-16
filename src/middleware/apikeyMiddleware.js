import jwt from 'jsonwebtoken';
import secret from '../credentials/jwtsecret';

const apikeyMiddleware = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) return res.status(401).jsend.error('No token provided.');
    // Verify the token from headers
    jwt.verify(token, secret.secret, function(err, decoded) {      
        if (err) return res.status(401).jsend.error('Failed to authenticate token.');
        req.decoded = decoded;
        next();
    });
};

export default apikeyMiddleware;