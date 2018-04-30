/**
 * Created by USER on 14/04/2017.
 */


var invoiceService = require("../services/InvoiceService");


function createInvoice (req, res) {

    invoiceService.createInvoice(req, res);
};

function getProductos (req, res) {

    invoiceService.getProductos(req, res);
};

module.exports = {
    createInvoice,
    getProductos
};
