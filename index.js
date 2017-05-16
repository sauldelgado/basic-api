/**
 * API básica creada en Node.js
 * Creada por Saúl Delgado <saul@sauldelgado.net>
 */

// Configuración de include
global.base_dir = __dirname;
global.abs_path = function (path) {
    return base_dir + path;
};
global.include = function (file) {
    return require(abs_path('/' + file));
};

// Paquetes a utilizar
require('dotenv').config();
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// Configuración del puerto donde reside nuestra API
var port = process.env.PORT;

// Configuramos el ruteador de Express como nuestro manejador de rutas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var router = express.Router();

// Configuración de CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(require('./app/controladores'));

app.listen(port);
console.log('Servidor basic-api iniciado en puerto ' + port);
console.log('sauldelgado.net (c) 2017');
