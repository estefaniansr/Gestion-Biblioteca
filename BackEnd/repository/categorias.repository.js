const {ReturnDocument} =require ('mongodb')
const { conexionAMongo } = require('../database/conect')

const Categorias=require('../model/categoriasModel')
conexionAMongo()
exports.traerTodasCategoriasRepository = async ()=>{
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