const express = require('express');

const validateLogin = require('./controllers/user.controller');

const app = express();

app.use(express.json());

app.post('/login', validateLogin.validateUsers);

module.exports = app;

// João Matheus Silva Franca