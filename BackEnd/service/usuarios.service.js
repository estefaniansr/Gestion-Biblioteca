const usuariosRepository = require('../repository/usuarios.repository')

exports.traerTodosUsuariosService = async () => {
    try{
        console.log('Service traerTodosUsuariosService')
        let datos = await usuariosRepository.traerTodosUsuariosRepository()
        return JSON.stringify(datos)
    }
    catch(error){
        console.log('ERROR en Service traerTodosUsuariosService')
        console.log(error)
    }
}