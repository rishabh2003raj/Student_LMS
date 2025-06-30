const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Invalid token' });
    }
    const token = authHeader.split(' ')[1];

    
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(403).json({message: "Invalid token"});
    }
};

module.exports = authenticate;