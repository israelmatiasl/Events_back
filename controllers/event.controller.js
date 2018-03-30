'use strict';

const Event = require('../models/event');
const Assistants = require('../models/assistants');
//const Enterprise = require('../models/enterprise');
const mongoosePagination = require('mongoose-pagination');
const itemsPerPage = require('../helpers/constants').itemsPerPage;

//=====================================================
// GET EVENTS PUBLIC AND PRIVATE (ENTERPRISE) =========
//=====================================================
function eventsEnterprise(req, res){

    const enterprise = req.enterprise; // obtained from token
    const enterpriseId = enterprise._id;

    const type = req.query.type.toUpperCase();
    let page = 1;
    if(req.query.page){
        page = req.query.page;
    }

    let promise;
    switch (type){
        case 'PRIVATE':
            promise = privateEvents('enterprise', enterpriseId, page);
            break;
        case 'PUBLIC':
            promise = publicEvents('enterprise', enterpriseId, page);
            break;
        default:
            return res.status(400).send({
                ok:false,
                message: 'invalid type'
            });
    }

    promise.then((value)=>{
       return res.status(200).send({
           ok:true,
           events: value
       });
    });
}


//=====================================================
// GET EVENTS PUBLIC AND PRIVATE (USER) ===============
//=====================================================
function eventsUser(req, res){

    const user = req.user; // obtained from token
    const userId = user._id;

    const type = req.query.type.toUpperCase();
    let page = 1;
    if(req.query.page){
        page = req.query.page;
    }

    let promise;
    switch (type){
        case 'PRIVATE':
            promise = privateEvents('user', userId, page);
            break;
        case 'PUBLIC':
            promise = publicEvents('user', userId, page);
            break;
        default:
            return res.status(400).send({
                ok:false,
                message: 'invalid type'
            });
    }

    promise.then((value)=>{
        return res.status(200).send({
            ok:true,
            events: value
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



//=====================================================
// FUNCTIONS ==========================================
//=====================================================
function privateEvents(from, id, page){
    if(from === 'enterprise'){
        return new Promise((resolve, reject)=>{
            Event.find({enterprise: id, event_type: 'PRIVATE'}).paginate(page, itemsPerPage, (err, events, total)=>{
                if(err){
                    reject('An error occurred while searching for the public events', err);
                }
                else {
                    resolve({
                        page,
                        pages: Math.ceil(total/itemsPerPage),
                        total,
                        events
                    });
                }
            });
        });
    }
    else if(from === 'user' ){
        return new Promise((resolve, reject)=>{
            Assistants.find({user: id, event_type: 'PRIVATE'})
                .populate('event')
                .paginate(page, itemsPerPage, (err, events, total)=>{
                if(err){
                    reject('An error occurred while searching for the public events', err);
                }
                else {
                    resolve({
                        page,
                        pages: Math.ceil(total/itemsPerPage),
                        total,
                        events
                    });
                }
            });
        });
    }
}


function publicEvents(from, id, page){

    if(from === 'enterprise'){
        return new Promise((resolve, reject)=>{
            Event.find({enterprise: id, event_type: 'PUBLIC'}).paginate(page, itemsPerPage, (err, events, total)=>{
                if(err){
                    reject('An error occurred while searching for the public events', err);
                }
                else {
                    resolve({
                        page,
                        pages: Math.ceil(total/itemsPerPage),
                        total,
                        events
                    });
                }
            });
        });
    }
    else if(from === 'user'){
        return new Promise((resolve, reject)=>{
            Assistants.find({user: id, event_type: 'PUBLIC'})
                .populate('event')
                .paginate(page, itemsPerPage, (err, events, total)=>{
                    if(err){
                        reject('An error occurred while searching for the public events', err);
                    }
                    else {
                        resolve({
                            page,
                            pages: Math.ceil(total/itemsPerPage),
                            total,
                            events
                        });
                    }
                });
        });
    }
}


module.exports = {
    newEvent,
    eventsEnterprise,
    eventsUser
};