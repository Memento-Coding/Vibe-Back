const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
    try {
        return jwt.verify(token,process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
}

module.exports = {
    verifyToken
}