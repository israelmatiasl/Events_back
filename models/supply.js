'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var supplySchema = new Schema({
    supply_name: { type: String, required: [true, 'supply_name is necessary'] },
    description: { type: String, required: [true, 'description is necessary'] },
    image: { type: String, required: false },
    price: { type: String, required: [true, 'price is necessary'] },
});

module.exports = mongoose.model('Supply', supplySchema);