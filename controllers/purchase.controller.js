'use strict';

const Capacity = require('../models/capacity');
const Technology = require('../models/technology');
const Reader = require('../models/reader');
const Printer = require('../models/printer');
const Supply = require('../models/supply');


//=====================================================
// CAPACITY FOR PURCHASE ==============================
//=====================================================
function getCapacities(req, res){

    Capacity.find({}).exec((err, items)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while searching for the items'
            });
        }

        return res.status(200).send({
            ok:true,
            items
        });
    });
}

function createCapacity(req, res){

    const params = req.body;

    const capacity = new Capacity({
        capacity: params.capacity,
        price: params.price
    });

    capacity.save((err, itemStored)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to create the item',
                errors: err
            });
        }

        return res.status(201).send({
            ok:true,
            itemStored
        });
    });
}

function updateCapacity(req, res){

    const id = req.params.id;
    const params = req.body;

    Capacity.findByIdAndUpdate(id, params, {new:true}, (err, itemUpdated)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to update the item',
                errors: err
            });
        }

        return res.status(200).send({
            ok:true,
            itemUpdated
        });
    });
}

function deleteCapacity(req, res){

    const id = req.params.id;

    Capacity.findByIdAndRemove(id, (err, itemDeleted)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to delete the item',
                errors: err
            });
        }

        return res.status(200).send({
            ok:true,
            itemDeleted
        });
    });
}



//=====================================================
// TECHNOLOGY FOR PURCHASE ============================
//=====================================================
function getTechnologies(req, res){

    Technology.find({}).exec((err, items)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while searching for the items'
            });
        }

        return res.status(200).send({
            ok:true,
            items
        });
    });
}

function createTechnology(req, res){

    const params = req.body;

    const technology = new Technology({
        technology_name: params.technology_name,
        description: params.description,
        image: null,
        price: params.price
    });

    technology.save((err, itemStored)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to create the item',
                errors: err
            });
        }

        return res.status(201).send({
            ok:true,
            itemStored
        });
    });
}

function updateTechnology(req, res){

    const id = req.params.id;
    const params = req.body;

    Technology.findByIdAndUpdate(id, params, {new:true}, (err, itemUpdated)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to update the item',
                errors: err
            });
        }

        return res.status(200).send({
            ok:true,
            itemUpdated
        });
    });
}

function deleteTechnology(req, res){

    const id = req.params.id;

    Technology.findByIdAndRemove(id, (err, itemDeleted)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to delete the item',
                errors: err
            });
        }

        return res.status(200).send({
            ok:true,
            itemDeleted
        });
    });
}



//=====================================================
// READER FOR PURCHASE ================================
//=====================================================
function getReaders(req, res){

    Reader.find({}).exec((err, items)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while searching for the items'
            });
        }

        return res.status(200).send({
            ok:true,
            items
        });
    });
}

function createReader(req, res){

    const params = req.body;

    const reader = new Reader({
        reader_name: params.reader_name,
        description: params.description,
        reader_type: params.reader_type,
        image: null,
        price: params.price
    });

    reader.save((err, itemStored)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to create the item',
                errors: err
            });
        }

        return res.status(201).send({
            ok:true,
            itemStored
        });
    });
}

function updateReader(req, res){

    const id = req.params.id;
    const params = req.body;

    Reader.findByIdAndUpdate(id, params, {new:true}, (err, itemUpdated)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to update the item',
                errors: err
            });
        }

        return res.status(200).send({
            ok:true,
            itemUpdated
        });
    });
}

function deleteReader(req, res){

    const id = req.params.id;

    Reader.findByIdAndRemove(id, (err, itemDeleted)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to delete the item',
                errors: err
            });
        }

        return res.status(200).send({
            ok:true,
            itemDeleted
        });
    });
}



//=====================================================
// PRINTER FOR PURCHASE ===============================
//=====================================================
function getPrinters(req, res){

    Printer.find({}).exec((err, items)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while searching for the items'
            });
        }

        return res.status(200).send({
            ok:true,
            items
        });
    });
}

function createPrinter(req, res){

    const params = req.body;

    const printer = new Printer({
        printer_name: params.printer_name,
        description: params.description,
        image: null,
        price: params.price
    });

    printer.save((err, itemStored)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to create the item',
                errors: err
            });
        }

        return res.status(201).send({
            ok:true,
            itemStored
        });
    });
}

function updatePrinter(req, res){

    const id = req.params.id;
    const params = req.body;

    Printer.findByIdAndUpdate(id, params, {new:true}, (err, itemUpdated)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to update the item',
                errors: err
            });
        }

        return res.status(200).send({
            ok:true,
            itemUpdated
        });
    });
}

function deletePrinter(req, res){

    const id = req.params.id;

    Printer.findByIdAndRemove(id, (err, itemDeleted)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to delete the item',
                errors: err
            });
        }

        return res.status(200).send({
            ok:true,
            itemDeleted
        });
    });
}



//=====================================================
// SUPPLY FOR PURCHASE ================================
//=====================================================
function getSupplies(req, res){

    Supply.find({}).exec((err, items)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while searching for the items'
            });
        }

        return res.status(200).send({
            ok:true,
            items
        });
    });
}

function createSupply(req, res){

    const params = req.body;

    const supply = new Supply({
        supply_name: params.supply_name,
        description: params.description,
        image: null,
        price: params.price
    });

    supply.save((err, itemStored)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to create the item',
                errors: err
            });
        }

        return res.status(201).send({
            ok:true,
            itemStored
        });
    });
}

function updateSupply(req, res){

    const id = req.params.id;
    const params = req.body;

    Supply.findByIdAndUpdate(id, params, {new:true}, (err, itemUpdated)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to update the item',
                errors: err
            });
        }

        return res.status(200).send({
            ok:true,
            itemUpdated
        });
    });
}

function deleteSupply(req, res){

    const id = req.params.id;

    Supply.findByIdAndRemove(id, (err, itemDeleted)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to delete the item',
                errors: err
            });
        }

        return res.status(200).send({
            ok:true,
            itemDeleted
        });
    });
}



module.exports = {
    getCapacities,
    createCapacity,
    updateCapacity,
    deleteCapacity,

    getTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology,

    getReaders,
    createReader,
    updateReader,
    deleteReader,

    getPrinters,
    createPrinter,
    updatePrinter,
    deletePrinter,

    getSupplies,
    createSupply,
    updateSupply,
    deleteSupply
};