require('dotenv/config');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const secretKey = process.env.JWT_SECRET;

const validateUsers = async (req, res) => {
  const { body: { email, password } } = req;

  const users = await userService.getAllUsers();

  const tokenConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  } 

  const validateEmail = users.some((u) => u.email === email);
  const validatePassword = users.some((u) => u.password === password);

  if (!validateEmail || !validatePassword) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = jwt.sign({ data: { email } }, secretKey, tokenConfig);

  return res.status(200).json({ token });
};

module.exports = {
  validateUsers,
};