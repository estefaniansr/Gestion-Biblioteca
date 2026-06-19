const express = require('express')
const routerCategorias = express.Router();
routerCategorias.use(express.json())
const categoriasController = require('../controller/categorias.controller')
routerCategorias.get('/', categoriasController.traerTodasCategoriasController)
module.exports = { routerCategorias }