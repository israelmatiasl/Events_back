'use strict';

const express = require('express');
const orderController = require('../controllers/order.controller');
const auth = require('../middlewares/authorization');

const api = express.Router();

api.post('/enterprise', [auth.tokenEnterpriseAuth], orderController.newOrderEnterprise);


api.post('/user', [auth.tokenUserAuth], orderController.newOrderUser);


module.exports = api;