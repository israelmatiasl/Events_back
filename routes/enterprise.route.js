'use strict';

const express = require('express');
const enterpriseController = require('../controllers/enterprise.controller');
const activate_account = require('../middlewares/activation');
const auth = require('../middlewares/authorization');

const api = express.Router();

api.get('/index', enterpriseController.index);
api.post('/login', enterpriseController.loginEnterprise);
api.post('/register', enterpriseController.registerEnterprise);
api.get('/activate-account', [activate_account.tokenEnterpriseActivate], enterpriseController.activateEnterpriseAccount);
api.post('/check-account', [auth.tokenEnterpriseAuth], enterpriseController.checkEnterpriseAccount);

module.exports = api;