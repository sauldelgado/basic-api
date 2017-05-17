/**
 * Controlador de usuario
 * Creado por Saúl Delgado <saul@sauldelgado.net>
 */

 var express = require('express'),
     router = express.Router(),
     usuarios = include('app/servicios/usuarios/usuario');

/**
 * Obtener una lista de usuarios existentes
 */
router.get('/usuarios', function (req, res) {
    usuarios.obtenerTodos()
        .then(function (usuariosExistentes) {
            return res.json(usuariosExistentes);
        })
        .catch(function (error) {
            return res.status(error.status).json(error.message);
        });
});

/**
 * Crear un nuevo usuario
 */
router.post('/usuarios', function (req, res) {
    if (!req.body['usuario'] || !req.body['nombre'] || !req.body['correo'] || !req.body['clave']) {
        return res.status(400).json({message: 'Falta uno o más campos en la petición'});
    }

    usuarios.crear(req.body['usuario'], req.body['nombre'], req.body['correo'], req.body['clave'])
        .then(function (nuevoUsuario) {
            return res.json(nuevoUsuario);
        })
        .catch(function (error) {
            return res.status(error.status).json(error.message);
        });
});

/**
 * Actualizar un usuario existente
 */
router.put('/usuarios', function (req, res) {
    if (!req.body['usuario'] || !req.body['nombre'] || !req.body['correo']) {
        return res.status(400).json({message: 'Falta uno o más campos en la petición'});
    }

    usuarios.actualizar(req.body['usuario'], req.body['nombre'], req.body['correo'], req.body['activo'])
        .then(function (usuarioActualizado) {
            return res.json(usuarioActualizado);
        })
        .catch(function (error) {
            return res.status(error.status).json(error.message);
        });
});

/**
 * Eliminar un usuario existente
 */
router.delete('/usuarios/:usuario', function (req, res) {
    usuarios.eliminar(req.params['usuario'])
        .then(function (resultado) {
            return res.json(resultado);
        })
        .catch(function (error) {
            return res.status(error.status).json(error.message);
        });
});

module.exports = router;
