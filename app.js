'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// view engine setup
const indexRouter = require('./routes/index');
const enterpriseRouter = require('./routes/enterprise.route');
const userRouter = require('./routes/user.route');
const eventRouter = require('./routes/event.route');
const purchaseRouter = require('./routes/purchase.route');
const orderRouter = require('./routes/order.route');

// charge middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


// use routes
app.use('/', indexRouter);
app.use('/api/enterprise', enterpriseRouter);
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/purchase', purchaseRouter);
app.use('/api/order', orderRouter);


module.exports = app;