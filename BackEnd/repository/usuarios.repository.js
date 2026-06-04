
const Usuarios = require('../model/usuariosModel')


exports.traerTodosUsuariosRepository = async () => {
    console.log('MongoDB Repository - traerTodosUsuarios')
    try {
        const usuarios = await Usuarios.find()
        return usuarios
    } catch (error) {
        console.log('Error, no encontre usuarios')
        throw Error(error)
    }
}