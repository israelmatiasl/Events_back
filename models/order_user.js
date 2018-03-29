'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validStatus = {
    values: ['NOT_CONFIRMED', 'CONFIRMED', 'CANCELLED'],
    message: '{VALUE} is not a valid status'
};

var orderUserSchema = new Schema({
    type: { type: String, required:true, default:'USER'},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true,'user is necessary'] },
    create_at: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true, default:'NOT_CONFIRMED', enum: validStatus },
    confirmation_date: { type: Date, required: false }
});

module.exports = mongoose.model('OrderUser', orderUserSchema);