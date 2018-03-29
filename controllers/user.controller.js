'use strict';

const User = require('../models/user');
const bcrypt = require('bcryptjs');
//const mongoosePagination = require('mongoose-pagination');
const jwtActivate = require('../services/jwt_activation');
const jwtAuth = require('../services/jwt_authorization');


//=====================================================
// USER LOGIN =========================================
//=====================================================
function loginUser(req, res){

    const params = req.body;
    const email = params.email;
    const password = params.password;

    User.findOne({email: email, status: 'ACTIVE'}).exec((err, foundUser) => {
        if(err) {
            return res.status(500).send({
                ok: false,
                message: 'An error occurred while searching for the user',
                errors : err
            });
        }

        if(!foundUser) {
            return res.status(404).send({
                ok:false,
                message: 'The user-email is not registered'
            });
        }

        if(!bcrypt.compareSync(password, foundUser.password)) {
            return res.status(404).send({
                ok:false,
                message: 'The user-password is not registered'
            });
        }
        else {
            foundUser.password = undefined;
            let token = jwtAuth.createUserAuthToken(foundUser);

            return res.status(200).send({
                ok:true,
                user: foundUser,
                token
            });
        }
    });
}


//=====================================================
// USER REGISTER ======================================
//=====================================================
function registerUser(req, res) {

    const params = req.body;

    var user = new User({
        name: params.name,
        last_name: params.last_name,
        email: params.email,
        password: bcrypt.hashSync(params.password, 10),
        dni: null,
        cellphone: null,
        birthday: null,
        country: null,
        updated_at: null,
        activated_at: null
    });

    user.save((err, userStored) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'An error occurred while trying to register the user',
                errors: err
            });
        }

        let token = jwtActivate.createUserActivateToken(userStored);
        let link_activation = `http://localhost:3800/api/user/activate-account?token=${token}`;
        return res.status(201).send({
            ok: true,
            message: 'We welcome you, please active your account',
            link_activation
        });
    });
}


//=====================================================
// STAFF REGISTER (JUST DO ENTERPRISE)=================
//=====================================================
function registerStaff(req, res){

    const enterpriseIdentified = req.enterprise;
    const enterpriseId = enterpriseIdentified._id;
    const params = req.body;

    var user = new User({
        user_type: 'STAFF_USER',
        created_by: enterpriseId,
        name: params.name,
        last_name: params.last_name,
        email: params.email,
        password: bcrypt.hashSync(params.password, 10),
        check: 'VERIFIED',
        status: 'ACTIVE',
        expires_at: params.expires_at
    });

    user.save((err, userStored) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'An error occurred while trying to register the staff',
                errors: err
            });
        }

        return res.status(201).send({
            ok: true,
            message: 'We welcome you, your account is ready',
            userStored
        });
    });
}


//=====================================================
// USER ACTIVATE ACCOUNT ==============================
//=====================================================
function activateUserAccount(req, res) {

    const userIdentified = req.user;
    const userId = userIdentified._id;

    User.findById(userId, (err, foundUser) => {

        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'An error occurred while searching for the user',
                errors: err
            });
        }

        if (!foundUser) {
            return res.status(404).send({
                ok: false,
                message: 'The user is not registered'
            });
        }

        foundUser.status = 'ACTIVE';
        foundUser.activated_at = Date.now();
        foundUser.save((err, userUpdated) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'There was an error activating the account',
                    errors: err
                });
            }
            userUpdated.password = undefined;
            return res.status(200).send({
                ok:true,
                message: 'Your account has been activated',
                userUpdated
            });
        });
    });
}


//=====================================================
// USER CHECK ACCOUNT =================================
//=====================================================
function checkUserAccount(req, res){

    const userIdentified = req.user;
    const userId = userIdentified._id;
    const params = req.body;

    User.findById(userId, (err, foundUser)=>{
        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'An error occurred while searching for the user',
                errors: err
            });
        }

        if (!foundUser) {
            return res.status(404).send({
                ok: false,
                message: 'The user is not registered'
            });
        }

        foundUser.dni= params.dni;
        foundUser.cellphone = params.cellphone;
        foundUser.birthday = params.birthday;
        foundUser.country = params.country;
        foundUser.address = params.address;
        foundUser.updated_at = Date.now();
        foundUser.check = 'VERIFIED';

        foundUser.save((err, userUpdated) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'There was an error verifying the account',
                    errors: err
                });
            }
            userUpdated.password = undefined;
            // return to auto_generate token
            let token = jwtAuth.createUserAuthToken(userUpdated);

            return res.status(200).send({
                ok:true,
                message: 'Your account has been verified',
                userUpdated,
                token
            });
        });

    });
}


module.exports = {
    loginUser,
    registerUser,
    registerStaff,
    activateUserAccount,
    checkUserAccount
};