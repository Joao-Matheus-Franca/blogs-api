const { Category } = require('../models');

const insertNewCategory = async (name) => {
    const user = await Category.create({ name });

    return user;
  };

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  insertNewCategory,
  getAllCategories,
};