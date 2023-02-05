const { User } = require('../models');

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getAllWithoutPassword = async () => {
  const users = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return users;
};

const getOneUser = async (id) => {
  const user = await User.findByPk(id);
  return user; 
};

const insertNewUser = async (displayName, email, password) => {
  const user = await User.create({ displayName, email, password });
  return user;
};

module.exports = { 
  getAllUsers, 
  getAllWithoutPassword,
  getOneUser,
  insertNewUser,
};