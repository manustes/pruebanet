'use strict'

var mongoose = require('mongoose');
var esquema = mongoose.Schema;
var cabeceraesquema = esquema({
    valortotal: Number,
    valoriva: Number,
    valorneto: Number,
    articulos: Number,
    cliente: String,
    fecha: Date
});

module.exports = mongoose.model('cabeceras', cabeceraesquema );