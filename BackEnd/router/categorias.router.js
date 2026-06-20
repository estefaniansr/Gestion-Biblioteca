const express = require('express')
const routerCategorias=express.Router();
routerCategorias.use(express.json())
const categoriasController=require('../controller/categorias.controller');
const { ReturnDocument } = require('mongodb');
//get
routerCategorias.get('/' , categoriasController.traerTodasCategoriasController)
//put
routerCategorias.put('/:id', categoriasController.editarCategoriaController)
module.exports={routerCategorias}
//post
routerCategorias.post('/', categoriasController.crearCategoriaController)
//delete
routerCategorias.delete('/:id',categoriasController.eliminarCategoriaController)