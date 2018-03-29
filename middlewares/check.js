'use strict';

exports.enterpriseCheck = function(req, res, next) {

    const enterprise = req.enterprise;

    if (enterprise.check === 'NOT_VERIFIED') {
        return res.status(401).send({
            ok: false,
            message: 'Your account is not verified'
        });
    }
    else {
        next();
    }
};