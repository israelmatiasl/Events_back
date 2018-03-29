'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/db_events').then(
    ()=>{
        console.log('Connection to db_events successfully');

        app.listen(port, ()=>{
            console.log('Server is running in  http://localhost:3800 successfully')
        });
    }
).catch( err => console.log(err));
