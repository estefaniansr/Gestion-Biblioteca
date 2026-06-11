const express = require('express')

const routerPrestamos = express.Router()

routerPrestamos.use(express.json())

const prestamosController = require('../controller/prestamos.controller')

routerPrestamos.get('/', prestamosController.traerTodosPrestamosController)

routerPrestamos.get('/:id', prestamosController.traerPrestamoPorIdController)

routerPrestamos.post('/crear', prestamosController.crearPrestamoController)

routerPrestamos.put('/devolver/:id', prestamosController.devolverLibroController)

routerPrestamos.delete('/eliminar/:id', prestamosController.eliminarPrestamoController)

module.exports = { routerPrestamos }