'use strict';

// Define Global Keys
require('dotenv').config();
require('./global-keys');

// Dependencies
const express = require('express');
const kraken = require('kraken-js');

// An nmp module written by me you can see it on: https://www.npmjs.com/package/customize-response-appender
const customResponseMethodAppender = require('customize-response-appender')({ 
    reponsesConfigFilePath: '/app/config/responses-config.js',
});

const app = express();


// <<<<<---------------MIDDLEWARES------------------------>>>>> 
/*
 * Kraken-js Configurations
 */
const options = {
    onconfig: function (config, next) {
        next(null, config);
    }
};
app.use(kraken(options));

app.all('*', customResponseMethodAppender);
// <<<<<--------------------------------------->>>>> 

app.on('start', function () {
    console.info('Application ready to serve requests.');
    console.info('Environment: %s', app.kraken.get('env:env'));
});

module.exports = app;
