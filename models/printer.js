'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var printerSchema = new Schema({
    printer_name: { type: String, required: [true, 'printer_name is necessary'] },
    description: { type: String, required: [true, 'description is necessary'] },
    image: { type: String, required: false },
    price: { type: Number, required: [true, 'price is necessary'] },
});

module.exports = mongoose.model('Printer', printerSchema);