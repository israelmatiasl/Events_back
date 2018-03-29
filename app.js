'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// view engine setup
const indexRouter = require('./routes/index');
const enterpriseRouter = require('./routes/enterprise.route');
const userRouter = require('./routes/user.route');

// charge middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/api/enterprise', enterpriseRouter);
app.use('/api/user', userRouter);


module.exports = app;
