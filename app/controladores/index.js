/**
 * Índice de controladores
 * Creado por Saúl Delgado <saul@sauldelgado.net>
 */

var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {return res.json('basic-api version 0.1')});
router.get('/usuarios', require('./usuarios/usuario'));
router.post('/usuarios', require('./usuarios/usuario'));
router.put('/usuarios', require('./usuarios/usuario'));
router.delete('/usuarios/:usuario', require('./usuarios/usuario'));

module.exports = router;
