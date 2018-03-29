'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validTypeOrderEnterprise = {
    values: ['CAPACITY', 'TECHNOLOGY', 'READER', 'PRINTER', 'SUPPLY'],
    message: '{VALUE} its not a valid order type'
};

var orderEnterpriseDetailSchema = new Schema({
    order_enterprise: { type: Schema.Types.ObjectId, ref: 'OrderEnterprise', required: [true, 'order_enterprise is necessary'] },
    typeOrder: { type: String, required: [true, 'type_order is necessary'], enum: validTypeOrderEnterprise },
    //PICK ONE
    capacity: { type: Schema.Types.ObjectId, ref: 'Capacity', required: false },
    technology: { type: Schema.Types.ObjectId, ref: 'Technology', required: false },
    reader: { type: Schema.Types.ObjectId, ref: 'Reader', required: false },
    printer: { type: Schema.Types.ObjectId, ref: 'Printer', required: false },
    supply: { type: Schema.Types.ObjectId, ref: 'Supply', required: false },
    quantity: { type: Number, required: [true, 'quantity is necessary'] }
});

module.exports = mongoose.model('OrderEnterpriseDetail', orderEnterpriseDetailSchema);