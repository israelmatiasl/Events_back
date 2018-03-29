'use strict';

const Enterprise = require('../models/enterprise');
const bcrypt = require('bcryptjs');
//const mongoosePagination = require('mongoose-pagination');
const jwtCheck = require('../services/jwt_check');
const jwtAuth = require('../services/jwt_authorization');

function index(req, res){
    return res.status(200).send({
        ok:true,
        message: 'from enterprises_Controller!!'
    });
}

//=====================================================
// ENTERPRISE LOGIN ===================================
//=====================================================
function loginEnterprise(req, res){

    const params = req.body;
    const email = params.email;
    const password = params.password;

    Enterprise.findOne({email: email, check: 'VERIFIED', status: 'ACTIVE'}).exec((err, foundEnterprise) => {
        if(err) {
            return res.status(500).send({
                ok: false,
                message: 'An error occurred while searching for the company',
                errors : err
            });
        }

        if(!foundEnterprise) {
            return res.status(404).send({
                ok:false,
                message: 'The company-email is not registered'
            });
        }

        if(!bcrypt.compareSync(password, foundEnterprise.password)) {
            return res.status(404).send({
                ok:false,
                message: 'The company-password is not registered'
            });
        }
        else {
            foundEnterprise.password = undefined;
            let token = jwtAuth.createEnterpriseAuthToken(foundEnterprise);

            return res.status(200).send({
                ok:true,
                enterprise: foundEnterprise,
                token
            });
        }
    });
}

//=====================================================
// ENTERPRISE REGISTER ================================
//=====================================================
function registerEnterprise(req, res) {

    const params = req.body;

    var enterprise = new Enterprise({
        ruc_enterprise: params.ruc_enterprise,
        business_name: null,
        person_contact: null,
        phone: null,
        address: null,
        image: null,
        email: params.email,
        password: bcrypt.hashSync(params.password, 10),
        updated_at: null
    });

    enterprise.save((err, enterpriseStored) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'An error occurred while trying to register the company',
                errors: err
            });
        }

        let token = jwtCheck.createEnterpriseCheckToken(enterpriseStored);
        let link_activation = `http://localhost:3800/api/enterprise/activate-account?token=${token}`;
        return res.status(201).send({
            ok: true,
            message: 'We welcome you',
            link_activation
        });
    });
}


//=====================================================
// ENTERPRISE ACTIVATE ACCOUNT ========================
//=====================================================
function activateEnterpriseAccount(req, res) {

    const enterpriseIdentified = req.enterprise;
    const enterpriseId = enterpriseIdentified._id;

    Enterprise.findById(enterpriseId, (err, foundEnterprise) => {

        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'An error occurred while searching for the company',
                errors: err
            });
        }

        if (!foundEnterprise) {
            return res.status(404).send({
                ok: false,
                message: 'The company is not registered'
            });
        }

        foundEnterprise.check = 'VERIFIED';
        foundEnterprise.status = 'ACTIVE';
        foundEnterprise.save((err, enterpriseUpdated) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'There was an error verifying the account',
                    errors: err
                });
            }
            enterpriseUpdated.password = undefined;
            return res.status(200).send({
                enterpriseUpdated
            });
        });
    });
}


module.exports = {
    index,
    registerEnterprise,
    activateEnterpriseAccount,
    loginEnterprise
};