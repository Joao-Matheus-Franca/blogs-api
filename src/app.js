const express = require('express');

const validateLogin = require('./controllers/user.controller');

const { validateToken } = require('./middlewares/validateToken');

const app = express();

app.use(express.json());

app.post('/login', validateLogin.validateUsers);

app.post('/user', validateLogin.validateNewUsers);

app.get('/user', validateToken, validateLogin.showAllUsers);

app.get('/user/:id', validateToken, validateLogin.findById);

module.exports = app;

// João Matheus Silva Franca