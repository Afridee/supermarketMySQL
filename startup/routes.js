const express = require('express');
const theWay = require('../routes/apis');


module.exports = function(app){
    app.use(express.json());
    app.use('/api/apis', theWay);
}