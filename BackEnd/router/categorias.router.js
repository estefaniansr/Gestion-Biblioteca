const express = require('express')
const routerCategorias=express.Router();
routerCategorias.use(express.json())
const categoriasController=require('../controller/categorias.controller');
const { ReturnDocument } = require('mongodb');

//get
routerCategorias.get('/' , categoriasController.traerTodasCategoriasController)
routerCategorias.get('/buscar', categoriasController.buscarCategoriaController)
//put
routerCategorias.put('/:id', categoriasController.editarCategoriaController)

//post
routerCategorias.post('/', categoriasController.crearCategoriaController)
//delete
routerCategorias.delete('/:id',categoriasController.eliminarCategoriaController)
module.exports={routerCategorias}
