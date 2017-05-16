/**
 * Servicio de usuario
 * Creado por Saúl Delgado <saul@sauldelgado.net>
 */

var Usuarios = {},
    knex = require('knex')({
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_SCHEMA
        }
    }),
    promise = require('bluebird');

/**
 * Obtiene los usuarios existentes
 */
Usuarios.obtenerTodos = function () {
    return new Promise(function (resolve, reject) {
        knex('usuarios')
            .select('usuario', 'nombre', 'correo', 'activo')
            .then(function (usuariosExistentes) {
                resolve(usuariosExistentes);
            })
            .catch(function (error) {
                console.log (error);
                reject({status: 500, message: 'Error interno obteniendo usuarios'});
            });
    });
};

/**
 * Crear un usuario
 */
Usuarios.crear = function (usuario, nombre, correo, clave) {
    return new Promise(function (resolve, reject) {
        knex('usuarios')
            .where('usuario', usuario)
            .select()
            .then(function (usuarioExistente) {
                if (usuarioExistente.length > 0) {
                    reject({status: 403, message: 'El usuario ya existe'});
                } else {
                    var nuevoUsuario = {
                        usuario: usuario,
                        nombre: nombre,
                        clave: clave, // ** Precaución **
                        correo: correo,
                        activo: true
                    };

                    knex('usuarios')
                        .insert(nuevoUsuario)
                        .then(function () {
                            resolve(nuevoUsuario);
                        })
                        .catch(function (error) {
                            console.log (error);
                            reject({status: 500, message: 'Error interno creando usuario'});
                        });
                }
            })
            .catch(function (error) {
                console.log (error);
                reject({status: 500, message: 'Error interno creando usuario'});
            });
    });
};

/**
 * Actualizar un usuario
 */
Usuarios.actualizar = function (usuario, nombre, correo, activo) {
    return new Promise(function (resolve, reject) {
        knex('usuarios')
            .where('usuario', usuario)
            .select()
            .then(function (usuarioEncontrado) {
                if (usuarioEncontrado.length > 0) {
                    knex('usuarios')
                        .where('usuario', usuario)
                        .update({
                            nombre: nombre,
                            correo: correo,
                            activo: activo
                        })
                        .then(function () {
                            knex('usuarios')
                                .where('usuario', usuario)
                                .select('usuario', 'nombre', 'correo', 'activo')
                                .then(function (usuarioActualizado) {
                                    usuarioActualizado.length > 0 ? resolve(usuarioActualizado[0]) : reject({status: 500, message: 'Error interno actualizando usuario'});
                                })
                                .catch(function (error) {
                                    console.log (error);
                                    reject({status: 500, message: 'Error interno actualizando usuario'});
                                });
                        })
                        .catch(function (error) {
                            console.log (error);
                            reject({status: 500, message: 'Error interno actualizando usuario'});
                        })
                } else {
                    reject({status: 404, message: 'Usuario no encontrado'});
                }
            })
            .catch(function (error) {
                console.log (error);
                reject({status: 500, message: 'Error interno actualizando usuario'});
            })
    });
};

/**
 * Eliminar un usuario
 */
Usuarios.eliminar = function (usuario) {
    return new Promise(function (resolve, reject) {
        knex('usuarios')
            .where('usuario', usuario)
            .select()
            .then(function (usuarioEncontrado) {
                if (usuarioEncontrado.length > 0) {
                    knex('usuarios')
                        .where('usuario', usuario)
                        .del()
                        .then(function () {
                            resolve({message: 'Usuario eliminado'});
                        })
                        .catch(function (error) {
                            console.log (error);
                            reject({status: 500, message: 'Error interno eliminando usuario'});
                        })
                } else {
                    reject({status: 404, message: 'Usuario no encontrado'});
                }
            })
            .catch(function (error) {
                console.log (error);
                reject({status: 500, message: 'Error interno eliminando usuario'});
            });
    });
};

module.exports = Usuarios;
