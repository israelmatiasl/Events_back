'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const validType = {
    values: ['NORMAL_USER', 'STAFF_USER'],
    message: '{VALUE} is not a valid user type'
};

const validCheck = {
    values: ['NOT_VERIFIED', 'VERIFIED'],
    message: '{VALUE} is not a valid check type'
};

const validStatus = {
    values: ['ACTIVE', 'INACTIVE', 'DELETED'],
    message: '{VALUE} is not a valid status type'
};

var userSchema = new Schema({
    user_type: { type: String, required: true, default: 'NORMAL_USER', enum: validType },
    created_by: { type: Schema.Types.ObjectId, ref: 'Enterprise', required: false },
    name: { type: String, required: [true,'name is necessary'] },
    last_name: { type: String, required: [true, 'last_name is necessary'] },
    email: { type: String, unique: true, required: [true, 'email is necessary'] },
    password: { type: String, required: [true, 'password is necessary'] },
    dni: { type: String, required: false },
    cellphone: { type: String, required: false },
    birthday: { type: Date, required: false },
    country: { type: String, required: false },
    check: { type: String, required: true, default: 'NOT_VERIFIED', enum: validCheck },
    status: { type: String, required: true, default: 'INACTIVE', enum: validStatus },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: false },
    expires_at :{ type: Date, required: false }, //Just when is a staff_user
    activated_at: { type: Date, required: false }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
module.exports = mongoose.model('User', userSchema);