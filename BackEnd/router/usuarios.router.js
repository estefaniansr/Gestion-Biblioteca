const express = require('express')

const routerUsuarios = express.Router()

const usuariosController = require('../controller/usuarios.controller')

routerUsuarios.get('/', usuariosController.traerTodosUsuariosController)

routerUsuarios.get('/nombre/:nombre', usuariosController.traerUsuarioNombre)

routerUsuarios.get('/apellido/:apellido', usuariosController.traerUsuarioApellido)

routerUsuarios.get('/dni/:dni', usuariosController.traerUsuarioDNI)

routerUsuarios.get('/email/:email', usuariosController.traerUsuarioEmail)

routerUsuarios.get('/telefono/:telefono', usuariosController.traerUsuarioTelefono)


module.exports = { routerUsuarios }