
const {ReturnDocument} =require ('mongodb')
const { conexionAMongo } = require('../database/conect')

const Categorias=require('../model/categoriasModel')
conexionAMongo()

const { ReturnDocument } = require('mongodb')
const { conexionAMongo } = require('../database/conect')

const Categorias = require('../model/categorias.model')

exports.traerTodasCategoriasRepository = async () => {

    console.log("Entrando a MONGO DB REPO - traeTodasCategoriasRepository")
    try {
        const categorias = await Categorias.find();
        console.log(categorias)
        return categorias
    } catch (error) {
        console.log("Error en mongo repository - traerTodasCategoriasRepository" + error)
        throw Error("Error en mongo repository - traerTodasCategoriasRepository" + error)
        
    }
}
exports.editarCategoriaRepository=async (id,datos)=>{
console.log(`Se va a editar el libro con Id: ${id}`)
try {
    const categoriaActualizada = await Categorias.findByIdAndUpdate(id,datos,{ new : true}) 
if (!categoriaActualizada) {
    return null;
}
return categoriaActualizada;
} catch (error) {
    console.log(`Error en editarCategoriaRepository ${error}`)
}
}
exports.crearCategoriaRepository = async (datos)=>{
try {
    console.log(`crearCategoriaRepository ${datos}`)
    const categoriaNueva= new Categorias(datos)
    await categoriaNueva.save()
    console.log(categoriaNueva)
    return categoriaNueva
} catch (error) {
    console.log("Error en crearCategoriaRepository ", error)
}
}
exports.eliminarCategoriaRepository = async (id) =>{
    try {
        const categoriaEliminada =await Categorias.findByIdAndDelete(id)
        if (!categoriaEliminada) {
            console.log("categoría no encontrada")
            return []
        }
        else {
            console.log(`Se eliminó el lenguaje de la lista con ID ${id}`)
            return categoriaEliminada
        }
    } catch (error) {
         console.log("error no se pudo eliminar  la categoria")
        throw Error(error)
    }
}
exports.buscarCategoriaRepository = async (input) =>{
    try {
        const refExBusqueda= new RegExp (input, 'i')
        const categoria= await Categorias.find({
            $or:[
                {
                    nombre: refExBusqueda
                },{
                    descripcion: refExBusqueda
                }
            ]
        })
        return categoria
    } catch (error) {
          console.log("error no se pudo buscar la categoria")
        throw Error(error)



    }
}