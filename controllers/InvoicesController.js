/**
 * Created by USER on 14/04/2017.
 */


var invoiceService = require("../services/InvoiceService");


function createInvoice (req, res) {

    invoiceService.createInvoice(req, res);
};

function getFacturas (req, res) {

    invoiceService.getFacturas(req, res);
};

function getDetalles (req, res) {

    invoiceService.getDetalles(req, res);
};

module.exports = {
    createInvoice,
    getFacturas,
    getDetalles
};
