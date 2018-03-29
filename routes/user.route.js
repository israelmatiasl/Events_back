'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');
const activate_account = require('../middlewares/activation');
const auth = require('../middlewares/authorization');

const api = express.Router();

api.post('/login', userController.loginUser);
api.post('/register', userController.registerUser);
api.post('/register-staff', [auth.tokenEnterpriseAuth], userController.registerStaff); // JUST DO A ENTERPRISE
api.get('/activate-account', [activate_account.tokenUserActivate], userController.activateUserAccount);
api.post('/check-account', [auth.tokenUserAuth], userController.checkUserAccount);

module.exports = api;
