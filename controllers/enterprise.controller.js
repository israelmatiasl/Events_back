'use strict';

const Enterprise = require('../models/enterprise');
const bcrypt = require('bcryptjs');
//const mongoosePagination = require('mongoose-pagination');
const jwtActivate = require('../services/jwt_activation');
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

    Enterprise.findOne({email: email, status: 'ACTIVE'}).exec((err, foundEnterprise) => {
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
        updated_at: null,
        activated_at: null
    });

    enterprise.save((err, enterpriseStored) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'An error occurred while trying to register the company',
                errors: err
            });
        }

        let token = jwtActivate.createEnterpriseActivateToken(enterpriseStored);
        let link_activation = `http://localhost:3800/api/enterprise/activate-account?token=${token}`;
        return res.status(201).send({
            ok: true,
            message: 'We welcome you, please active your account',
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

        foundEnterprise.status = 'ACTIVE';
        foundEnterprise.activated_at = Date.now();
        foundEnterprise.save((err, enterpriseUpdated) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'There was an error activating the account',
                    errors: err
                });
            }
            enterpriseUpdated.password = undefined;
            return res.status(200).send({
                ok:true,
                message: 'Your account has been activated',
                enterpriseUpdated
            });
        });
    });
}


//=====================================================
// ENTERPRISE CHECK ACCOUNT ===========================
//=====================================================
function checkEnterpriseAccount(req, res){

    const enterpriseIdentified = req.enterprise;
    const enterpriseId = enterpriseIdentified._id;
    const params = req.body;

    Enterprise.findById(enterpriseId, (err, foundEnterprise)=>{
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

        foundEnterprise.business_name = params.business_name;
        foundEnterprise.person_contact = params.person_contact;
        foundEnterprise.phone= params.phone;
        foundEnterprise.address = params.address;
        foundEnterprise.updated_at = Date.now();
        foundEnterprise.check = 'VERIFIED';

        foundEnterprise.save((err, enterpriseUpdated) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'There was an error verifying the account',
                    errors: err
                });
            }
            enterpriseUpdated.password = undefined;
            // return to auto_generate token
            let token = jwtAuth.createEnterpriseAuthToken(enterpriseUpdated);

            return res.status(200).send({
                ok:true,
                message: 'Your account has been verified',
                enterpriseUpdated,
                token
            });
        });

    });
}


module.exports = {
    index,
    loginEnterprise,
    registerEnterprise,
    activateEnterpriseAccount,
    checkEnterpriseAccount
};