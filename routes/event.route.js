'use strict';

const express = require('express');
const eventController = require('../controllers/event.controller');
const auth = require('../middlewares/authorization');
const check = require('../middlewares/check');

const api = express.Router();

api.post('/', [auth.tokenEnterpriseAuth, check.enterpriseCheck], eventController.newEvent);
api.get('/enterprise', auth.tokenEnterpriseAuth, eventController.eventsEnterprise);
api.get('/user', auth.tokenUserAuth, eventController.eventsUser);

module.exports = api;