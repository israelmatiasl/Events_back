'use strict';

const Event = require('../models/event');
const Enterprise = require('../models/enterprise');
//const mongoosePagination = require('mongoose-pagination');


function newEvent(req, res){

    const params = req.body;

    var event = new Event({
        enterprise: params.enterprise,
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