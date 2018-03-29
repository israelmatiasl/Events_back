'use strict';

const express = require('express');
const eventController = require('../controllers/event.controller');
const auth = require('../middlewares/authorization');
const check = require('../middlewares/check');

const api = express.Router();

api.post('/', [auth.tokenEnterpriseAuth, check.enterpriseCheck], eventController.newEvent);

module.exports = api;