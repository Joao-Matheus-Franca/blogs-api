const express = require('express');

const validateLogin = require('./controllers/user.controller');
const validateCategories = require('./controllers/category.controller');
const validatePosts = require('./controllers/post.controller');

const { validateToken } = require('./middlewares/validateToken');

const app = express();

app.use(express.json());

app.post('/login', validateLogin.validateUsers);

app.post('/user', validateLogin.validateNewUsers);

app.get('/user', validateToken, validateLogin.showAllUsers);

app.get('/user/:id', validateToken, validateLogin.findById);

app.post('/categories', validateToken, validateCategories.validateNewCategory);

app.get('/categories', validateToken, validateCategories.showAllCategories);

app.post('/post', validateToken, validatePosts.validateNewPost);

module.exports = app;

// João Matheus Silva Franca