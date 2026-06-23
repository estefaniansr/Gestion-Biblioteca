const express = require('express')
const routerLibros = express.Router()

const librosController = require('../controller/libros.controller')

routerLibros.get('/', librosController.obtenerLibrosController)
routerLibros.get('/buscar', librosController.buscarLibroController)

routerLibros.post('/', librosController.crearLibroController)

routerLibros.delete('/:id', librosController.eliminarLibroController)

routerLibros.put('/:id', librosController.editarLibroController)

module.exports = { routerLibros }