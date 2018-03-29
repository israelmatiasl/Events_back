'use strict';

const express = require('express');
const enterpriseController = require('../controllers/enterprise.controller');
const checkaccount = require('../middlewares/check');

const api = express.Router();

api.get('/index', enterpriseController.index);
api.post('/login', enterpriseController.loginEnterprise);
api.post('/register', enterpriseController.registerEnterprise);
api.get('/activate-account', [checkaccount.tokenEnterpriseCheck], enterpriseController.activateEnterpriseAccount);

module.exports = api;