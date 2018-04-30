'use strict'

var mongoose = require('mongoose');
var esquema = mongoose.Schema;
var detalleesquema = esquema({
    numeroproductos: Number,
    valorUnitario: Number,
    valortotal: Number,
    cabecera: {type: esquema.ObjectId, ref: 'cabecera'},
    producto: Number
});

module.exports = mongoose.model('detalles', detalleesquema );