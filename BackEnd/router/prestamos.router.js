const express = require('express')
const routerPrestamos = express.Router()

routerPrestamos.use(express.json())

const prestamosController = require('../controller/prestamos.controller')

routerPrestamos.get('/', prestamosController.traerTodosPrestamosController)
routerPrestamos.get('/estadisticas', prestamosController.obtenerEstadisticasController)
routerPrestamos.get('/:id', prestamosController.traerPrestamoPorIdController)
routerPrestamos.post('/', prestamosController.crearPrestamoController)
routerPrestamos.patch('/:id', prestamosController.devolverLibroController)
routerPrestamos.delete('/:id', prestamosController.eliminarPrestamoController)

module.exports = { routerPrestamos }