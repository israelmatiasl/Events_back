'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var guestSchema = new Schema({
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: [true, 'event is necessary'] },
    guest_email: { type: String, required: [true, 'guest_email is necessary'] },
    image: { type: String, required: false },
    invitation_date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Guest', guestSchema);