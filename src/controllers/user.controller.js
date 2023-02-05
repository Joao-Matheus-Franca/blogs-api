require('dotenv/config');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const secretKey = process.env.JWT_SECRET;

const tokenConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const validateEmails = async (email) => {
  const users = await userService.getAllUsers();
  const validateEmailFormat = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const validateEmailDb = users.some((u) => u.email === email);
  if (!validateEmailFormat) {
    return { typeError: 1 };
  }
  if (validateEmailDb) {
    return { typeError: 2 };
  }
  return { typeError: 0 };
};

const validateUsers = async (req, res) => {
  const { body: { email, password } } = req;

  const users = await userService.getAllUsers();

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

const validateNewUsers = async (req, res) => {
  const { body: { displayName, email, password } } = req;
  const userEmail = await validateEmails(email);
  if (displayName.length < 8) {
  return res.status(400).json({ 
    message: '"displayName" length must be at least 8 characters long' });
  }
  if (userEmail.typeError === 1) {
  return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (userEmail.typeError === 2) {
  return res.status(409).json({ message: 'User already registered' });
  }
  if (password.length < 6) {
  return res.status(400).json({ message: '"password" length must be at least 6 characters long' });
  }
  const token = jwt.sign({ data: { displayName, email } }, secretKey, tokenConfig);
  userService.insertNewUser(displayName, email, password);
  return res.status(201).json({ token });
};

const showAllUsers = async (req, res) => {
  const users = await userService.getAllWithoutPassword();
  return res.status(200).json(users);
};

const findById = async (req, res) => {
  const { params: { id } } = req;
  const user = await userService.getOneUser(id);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  return res.status(200)
    .json({ id: user.id, displayName: user.displayName, email: user.email, image: user.image });
};

module.exports = {
  validateUsers,
  validateNewUsers,
  showAllUsers,
  findById,
};