const express = require('express')

const routerUsuarios = express.Router()

routerUsuarios.use(express.json())

const usuariosController = require('../controller/usuarios.controller')

routerUsuarios.get('/', usuariosController.traerTodosUsuariosController)

routerUsuarios.get('/nombre/:nombre', usuariosController.traerUsuarioNombreController)

routerUsuarios.get('/apellido/:apellido', usuariosController.traerUsuarioApellidoController)

routerUsuarios.get('/dni/:dni', usuariosController.traerUsuarioDNIController)

routerUsuarios.get('/email/:email', usuariosController.traerUsuarioEmailController)

routerUsuarios.get('/telefono/:telefono', usuariosController.traerUsuarioTelefonoController)

routerUsuarios.post('/crear', usuariosController.crearUsuarioController)

routerUsuarios.post('/modificar/:dni', usuariosController.modificarUsuarioController)

module.exports = { routerUsuarios }