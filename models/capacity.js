'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var capacitySchema = new Schema({
    capacity: { type: String, required: [true, 'capacity is necessary'] },
    price: { type: String, required: [true, 'capacity_price is necessary'] },
});

module.exports = mongoose.model('Capacity', capacitySchema);