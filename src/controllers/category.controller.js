const categoryService = require('../services/category.service');

const validateNewCategory = async (req, res) => {
  const { body: { name } } = req;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  
  const teste = await categoryService.insertNewCategory(name);
  
  return res.status(201).json(teste);
};

module.exports = {
  validateNewCategory,
};