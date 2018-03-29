'use strict';

const Event = require('../models/event');
//const Enterprise = require('../models/enterprise');
//const mongoosePagination = require('mongoose-pagination');

//=====================================================
// GET PRIVATE EVENTS (ENTERPRISE) ====================
//=====================================================
function privateEvents_Enterprise(req, res){

    const enterprise = req.enterprise; // obtained from token

    Event.find({enterprise: enterprise._id, event_type: 'PRIVATE' }).exec((err, events)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while searching for the events',
                errors : err
            });
        }

        return res.status(200).send({
           ok: true,
           events
        });
    });
}

//=====================================================
// GET PUBLIC EVENTS (ENTERPRISE) =====================
//=====================================================
function publicEvents_Enterprise(req, res){

    const enterprise = req.enterprise; // obtained from token

    Event.find({enterprise: enterprise._id, event_type: 'PUBLIC' }).exec((err, events)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while searching for the events',
                errors : err
            });
        }

        return res.status(200).send({
            ok: true,
            events
        });
    });
}


//=====================================================
// CREATE NEW EVENT (ENTERPRISE) ======================
//=====================================================
function newEvent(req, res){

    const params = req.body;
    const enterprise = req.enterprise; // obtained from token

    var event = new Event({
        enterprise: enterprise._id,
        event_name: params.event_name,
        event_type: params.event_type,
        begin_date: params.begin_date,
        end_date: params.end_date,
        location: params.location,
        capacity: null,
        price: params.price,
        updated_at: null,
    });

    event.save((err, eventStored)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to create the event',
                errors : err
            });
        }

        return res.status(201).send({
            ok:true,
            event : eventStored
        });
    });
}

module.exports = {
    privateEvents_Enterprise,
    newEvent
};