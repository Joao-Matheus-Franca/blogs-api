const jwt = require('jsonwebtoken');
const postService = require('../services/post.service');
const categoryService = require('../services/category.service');
require('dotenv/config');

const secretKey = process.env.JWT_SECRET;

const validateNewPost = async (req, res) => {
  const { body: { title, content, categoryIds } } = req;

  const userToken = req.header('Authorization');
  const tokenDecoded = jwt.verify(userToken, secretKey);

  const categories = await categoryService.getAllCategories();
  const categoriesIds = categories.map((c) => c.id);
  const validateCategories = categoryIds.every((c) => categoriesIds.includes(c));

  const userId = tokenDecoded.data.id;
  
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if (!validateCategories) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const newPost = await postService.insertNewPost(title, content, userId);
  
  categoryIds.forEach((c) => postService.insertNewCategoryPost(newPost.id, c));

  return res.status(201).json(newPost);
};

module.exports = {
  validateNewPost,
};