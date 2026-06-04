const express = require('express')
const routerLibros = express.Router() // crea objeto Router 

const librosController = require('../controller/libros.controller')

// get
routerLibros.get('/', librosController.obtenerLibrosController) // envia metood get ejecutando obtenerLibrosController
routerLibros.get('/buscar', librosController.buscarLibroController)

// post
routerLibros.post('/', librosController.crearLibroController)

//delete
routerLibros.delete('/:id', librosController.eliminarLibroController)


module.exports = { routerLibros }