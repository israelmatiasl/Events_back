'use strict';

const jwt = require('jsonwebtoken');
const secretKeyCheck = require('../helpers/constants').secretKeyAuth;

exports.tokenEnterpriseAuth = function(req, res, next) {

    const token = req.query.token;
    if (!token) {
        return res.status(403).send({
            ok: false,
            message: 'Enterprise account verification does not has a valid token'
        });
    }

    jwt.verify(token, secretKeyCheck, (err, enterpriseDecoded) => {

        if (err) {
            return res.status(401).send({
                ok: false,
                message: 'Invalid token',
                errors: err
            });
        }

        req.enterprise = enterpriseDecoded.enterprise;
        next();
    });
};


exports.tokenUserAuth = function(req, res, next) {

    const token = req.query.token;
    if (!token) {
        return res.status(403).send({
            ok: false,
            message: 'User account verification does not has a valid token'
        });
    }

    jwt.verify(token, secretKeyCheck, (err, userDecoded) => {

        if (err) {
            return res.status(401).send({
                ok: false,
                message: 'Invalid token',
                errors: err
            });
        }

        req.user = userDecoded.user;
        next();
    });
};