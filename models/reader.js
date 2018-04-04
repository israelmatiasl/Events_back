'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validReader = {
    values: ['BAR_CODE', 'QR_CODE', 'RFId'],
    message: '{VALUE} is not a valid reader'
};

const validType = {
    values: ['HAND_HELD', 'USB', 'KIOSK'],
    message: '{VALUE} is not a valid reader type'
};

var readerSchema = new Schema({
    reader_name: { type: String, required: [true, 'reader_name is necessary'], enum: validReader },
    description: { type: String, required: [true, 'description is necessary'] },
    reader_type: { type: String, required: false, enum: validType },
    image: { type: String, required: false },
    price: { type: Number, required: [true, 'price is necessary'] },
});

module.exports = mongoose.model('Reader', readerSchema);