'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var technologySchema = new Schema({
    technology_name: { type: String, required: [true, 'technology_name is necessary'] },
    description: { type: String, required: [true, 'description is necessary'] },
    image: { type: String, required: false },
    price: { type: String, required: [true, 'price is necessary'] },
});

module.exports = mongoose.model('Technology', technologySchema);