const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }); 
    } catch (error) {
        throw new Error('Error generating token');
    }
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = {
  generateToken,
  verifyToken
};