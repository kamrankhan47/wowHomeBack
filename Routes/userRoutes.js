const express = require('express');
const userController = require('../Controller/userController');
const userRoutes = express.Router();

userRoutes.post('/register', userController.register);
userRoutes.post('/confirmCode', userController.confirmCode);
userRoutes.post('/login', userController.login);

module.exports = userRoutes;

