'use strict';

const jwt = require('jsonwebtoken');
const secretKeyAuth = require('../helpers/constants').secretKeyAuth;
const expiredTime = 7200; //seconds

exports.createEnterpriseAuthToken = function(enterprise) {
    return jwt.sign({ enterprise: enterprise }, secretKeyAuth, { expiresIn: expiredTime });
};

exports.createUserAuthToken = function(user) {
    return jwt.sign({ user: user }, secretKeyAuth, { expiresIn: expiredTime });
};