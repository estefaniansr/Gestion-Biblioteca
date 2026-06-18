const express = require('express')

const routerUsuarios = express.Router()

routerUsuarios.use(express.json())

const usuariosController = require('../controller/usuarios.controller')

routerUsuarios.get('/', usuariosController.traerTodosUsuariosController)

routerUsuarios.get('/id/:id', usuariosController.traerUsuarioIdController)

routerUsuarios.post('/crear', usuariosController.crearUsuarioController)

routerUsuarios.put('/modificar/:id', usuariosController.modificarUsuarioController)

routerUsuarios.delete('/borrar/:id', usuariosController.borrarUsuario)

routerUsuarios.get('/buscar/:buscar', usuariosController.traerUsuarioController)

module.exports = { routerUsuarios }

/*
routerUsuarios.get('/nombre/:nombre', usuariosController.traerUsuarioNombreController)

routerUsuarios.get('/apellido/:apellido', usuariosController.traerUsuarioApellidoController)

routerUsuarios.get('/dni/:dni', usuariosController.traerUsuarioDNIController)

routerUsuarios.get('/email/:email', usuariosController.traerUsuarioEmailController)

routerUsuarios.get('/telefono/:telefono', usuariosController.traerUsuarioTelefonoController)
*/