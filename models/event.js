'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validType = {
    values: ['PUBLIC', 'PRIVATE'],
    message: '{VALUE} is not a valid event type'
};

const validStatus = {
    values: ['ACTIVE', 'INACTIVE', 'DELETED'],
    message: '{VALUE} is not a valid event status'
};

var eventSchema = new Schema({
    enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise', required: [true, 'enterprise is necessary'] },
    event_name: { type: String, required: [true, 'event_name is necessary'] },
    event_type: { type: String, required: true, default: 'PRIVATE', enum: validType },
    begin_date: { type: Date, required: [true, 'begin_date is necessary'] },
    end_date: { type: Date, required: [true, 'end_date is necessary'] },
    location: { type: String, required: [true, 'location is necessary'] },
    capacity: { type: Number, required: false }, //Just update when is private event and after the purchase
    price: { type: String, required: false }, //Just when is public event and has a price
    status: { type: String, required: true, default: 'INACTIVE'},
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: false }
});

module.exports = mongoose.model('Event', eventSchema);