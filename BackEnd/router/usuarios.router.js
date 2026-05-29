const express = require('express')

const routerUsuarios = express.Router()

const usuariosController = require('../controller/usuarios.controller')

routerUsuarios.get('/', usuariosController.traerTodosUsuariosController)


module.exports = { routerUsuarios }