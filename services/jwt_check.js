'use strict';

const jwt = require('jsonwebtoken');
const secretKeyCheck = require('../helpers/constants').secretKeyCheck;
const expiredTime = 7200; //seconds

exports.createEnterpriseCheckToken = function(enterprise) {
    return jwt.sign({ enterprise: enterprise }, secretKeyCheck, { expiresIn: expiredTime });
};

exports.createUserCheckToken = function(user) {
    return jwt.sign({ user: user }, secretKeyCheck, { expiresIn: expiredTime });
};