'use strict';

const jwt = require('jsonwebtoken');
const secretKeyActivate = require('../helpers/constants').secretKeyActivate;
const expiredTime = 14400; //seconds

exports.createEnterpriseActivateToken = function(enterprise) {
    return jwt.sign({ enterprise: enterprise }, secretKeyActivate, { expiresIn: expiredTime });
};

exports.createUserActivateToken = function(user) {
    return jwt.sign({ user: user }, secretKeyActivate, { expiresIn: expiredTime });
};