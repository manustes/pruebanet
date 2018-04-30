/**
 * Created by USER on 13/04/2017.
 */



var invoices = [];

var monedas = [
    { moneda: "COP", tasacambio: 1 },
    { moneda: "USD", tasacambio: 2900 },
    { moneda: "MXN", tasacambio: 150 }
];

var Detalle = require('../models/detalle');
var Cabecera = require('../models/cabecera');

function createInvoice(req, res) {


    var data = req.body.products;
    invoices = data;
    var totalcompra = 0;
    var totalProductos = 0;
    var tasaiva = 0.19;
    var valoriva = 0;
    var valorconversion = 0;
    var valordetalle = 0;

    var tipocambio = 'USD';

    for (var i = 0; i < invoices.length; i++) {
        indexCambio = monedas.find(moneda => moneda.moneda === invoices[i].cambio);
        totalProductos = Number(totalProductos) + Number(invoices[i].quantity);
        valorconversion = Number(invoices[i].value) * Number(indexCambio.tasacambio);
        totalcompra = Number(totalcompra) + Number(valorconversion);
    }

    valoriva = Number(totalcompra) * Number(tasaiva);
    var cabecera = new Cabecera();

    cabecera.valortotal = Number(totalcompra) + Number(valoriva);
    cabecera.valoriva = Number(valoriva);
    cabecera.valorneto = Number(totalcompra);
    cabecera.articulos = totalProductos;
    cabecera.cliente = "Cliente Prueba"
    cabecera.fecha = new Date();

    cabecera.save((err, cabecera) => {
        if (err)
            res.status(500).jsonp("Error en la ejecución");
        else {
            console.log(cabecera._id);
            for (var i = 0; i < invoices.length; i++) {

                var detalle = new Detalle();
                indexCambio = monedas.find(moneda => moneda.moneda === invoices[i].cambio);

                valorconversion = Number(invoices[i].value) * Number(indexCambio.tasacambio);
                detalle.valorUnitario = Number(valorconversion);
                detalle.valortotal = Number(valorconversion) * Number(invoices[i].quantity);

                detalle.numeroproductos = Number(invoices[i].quantity);
                detalle.producto = Number(invoices[i].id);
                detalle.cabecera = cabecera._id;

                detalle.save((err, producto) => {
                    if (err)
                        res.status(500).jsonp("Error en la ejecución");
                    else
                        console.log("detalle insertado con exito.");

                });
            }
            res.status(200).jsonp(cabecera);
        }

    });





    //TODO send the data of the invoice as answer
    // res.status(200).jsonp(data);


};


function getProductos(req, res) {

    console.log("servicio productos");
};

module.exports = {
    createInvoice,
    getProductos
};
