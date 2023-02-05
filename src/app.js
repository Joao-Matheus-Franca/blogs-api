const express = require('express');

const validateLogin = require('./controllers/user.controller');

const app = express();

app.use(express.json());

app.post('/login', validateLogin.validateUsers);

app.post('/user', validateLogin.validateNewUsers);

module.exports = app;

// João Matheus Silva Franca