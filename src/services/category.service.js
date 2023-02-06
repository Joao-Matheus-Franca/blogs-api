const { Category } = require('../models');

const insertNewCategory = async (name) => {
    const user = await Category.create({ name });

    return user;
  };

module.exports = {
  insertNewCategory,
};