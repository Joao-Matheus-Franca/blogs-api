const jwt = require('jsonwebtoken');
require('dotenv/config');

const secretKey = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const userToken = req.header('Authorization');
  if (!userToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const tokenDecoded = jwt.verify(userToken, secretKey);
    if (tokenDecoded) {
      return next();    
    }
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateToken,
};