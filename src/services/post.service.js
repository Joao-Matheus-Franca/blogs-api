const { BlogPost, PostCategory } = require('../models');

const insertNewPost = async (title, content, userId) => {
  const newPost = await BlogPost
    .create({ title, content, userId, updated: new Date(), published: new Date() });
  return newPost;
};

const insertNewCategoryPost = async (postId, categoryId) => {
  const newRegistry = await PostCategory.create({ postId, categoryId });
  return newRegistry;
};

module.exports = {
  insertNewPost,
  insertNewCategoryPost,
};