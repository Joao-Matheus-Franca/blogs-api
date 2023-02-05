const { User } = require('../models');

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const insertNewUser = async (displayName, email, password) => {
  const user = await User.create({ displayName, email, password });
  return user;
};

module.exports = { 
  getAllUsers, 
  insertNewUser,
};