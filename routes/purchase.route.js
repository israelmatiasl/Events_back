'use strict';

const express = require('express');
const purchaseController = require('../controllers/purchase.controller');
const auth = require('../middlewares/authorization');
const check = require('../middlewares/check');

const api = express.Router();

api.get('/capacities', purchaseController.getCapacities);
api.post('/capacity', purchaseController.createCapacity);
api.put('/capacity/:id', purchaseController.updateCapacity);
api.delete('/capacity/:id', purchaseController.deleteCapacity);

api.get('/technologies', purchaseController.getTechnologies);
api.post('/technology', purchaseController.createTechnology);
api.put('/technology/:id', purchaseController.updateTechnology);
api.delete('/technology/:id', purchaseController.deleteTechnology);

api.get('/readers', purchaseController.getReaders);
api.post('/reader', purchaseController.createReader);
api.put('/reader/:id', purchaseController.updateReader);
api.delete('/reader/:id', purchaseController.deleteReader);

api.get('/printers', purchaseController.getPrinters);
api.post('/printer', purchaseController.createPrinter);
api.put('/printer/:id', purchaseController.updatePrinter);
api.delete('/printer/:id', purchaseController.deletePrinter);

api.get('/supplies', purchaseController.getSupplies);
api.post('/supply', purchaseController.createSupply);
api.put('/supply/:id', purchaseController.updateSupply);
api.delete('/supply/:id', purchaseController.deleteSupply);

module.exports = api;