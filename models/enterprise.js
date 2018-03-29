'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const validType = {
    values: ['SUPPLIER', 'ORGANIZER'],
    message: '{VALUE} is not a valid business type'
};

const validCheck = {
    values: ['NOT_VERIFIED', 'VERIFIED'],
    message: '{VALUE} is not a valid check type'
};

const validStatus = {
    values: ['ACTIVE', 'INACTIVE', 'DELETED'],
    message: '{VALUE} is not a valid status type'
};

var enterpriseSchema = new Schema({
    ruc_enterprise: { type: String, required: [true, 'ruc is necessary'] },
    business_name: { type: String, required: false },
    person_contact: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    enterprise_type: { type: String, required: true, default: 'ORGANIZER', enum: validType },
    image: { type: String, required: false },
    email: { type: String, unique: true, required: [true, 'email is necessary'] },
    password: { type: String, required: [true, 'password is necessary'] },
    check: { type: String, required: true, default: 'NOT_VERIFIED', enum: validCheck },
    status: { type: String, required: true, default: 'ACTIVE', enum: validStatus },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: false }
});

enterpriseSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
module.exports = mongoose.model('Enterprise', enterpriseSchema);