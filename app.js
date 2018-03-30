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



// use routes
app.use('/', indexRouter);
app.use('/api/enterprise', enterpriseRouter);
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/purchase', purchaseRouter);
app.use('/api/order', orderRouter);


module.exports = app;
