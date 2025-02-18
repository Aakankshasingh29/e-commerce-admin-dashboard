// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'
const SECRET_KEY = "akku123";  // Store this securely!
export const generateToken = (user) => {
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h'
    });
    return token
};
export const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

export default { generateToken, verifyToken}