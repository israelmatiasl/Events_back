'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderUserDetailSchema = new Schema({
    order_user: { type: Schema.Types.ObjectId, ref: 'OrderUser', required: [true, 'order_user is necessary'] },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: [true, 'event is necessary'] },
    quantity: { type: Number, required: [true, 'quantity is necessary'] }
});

module.exports = mongoose.model('OrderUserDetail', orderUserDetailSchema);