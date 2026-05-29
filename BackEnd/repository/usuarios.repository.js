const { conexionAMongo } = require('../database/conect')

const Usuarios = require('../model/usuariosModel')

conexionAMongo('usuarios')

exports.traerTodosUsuarios = async () => {
    console.log('MongoDB Repository - traerTodosUsuarios')
    try{
        const usuarios = await Usuarios.find()
        return usuarios
    }catch(error){
        console.log('Error, no encontre usuarios')
        throw Error(error)
    }
}