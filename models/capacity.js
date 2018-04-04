'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var capacitySchema = new Schema({
    capacity_name: { type: String, required: [true, 'capacity_name is necessary'] },
    capacity: { type: String, required: [true, 'capacity is necessary'] },
    price: { type: Number, required: [true, 'capacity_price is necessary'] },
});

module.exports = mongoose.model('Capacity', capacitySchema);