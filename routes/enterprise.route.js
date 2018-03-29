'use strict';

const express = require('express');
const enterpriseController = require('../controllers/enterprise.controller');

const api = express.Router();

api.get('/index', enterpriseController.index);
api.post('/register', enterpriseController.registerEnterprise);
api.put('/activate-account', enterpriseController.activateEnterpriseAccount);

module.exports = api;