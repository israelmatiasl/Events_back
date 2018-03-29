'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validTypeEvent = {
    values: ['PRIVATE', 'PUBLIC'],
    message: '{VALUE} is not a valid event type'
};

var assistantScheme = new Schema({
    event_type: { type: String, required: [true, 'event_type is necessary'], enum: validTypeEvent },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'user is necessary'] },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: [true, 'event is necessary'] },
    token_event: { type: String, required: [true, 'token_event is necessary'] }
});

module.exports = mongoose.model('Assistant', assistantScheme);