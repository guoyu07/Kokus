import jwt from 'jsonwebtoken';
import secret from '../credentials/jwtsecret';

const apikeyMiddleware = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        // Verify the token from headers
        jwt.verify(token, secret.secret, function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
};

export default apikeyMiddleware;