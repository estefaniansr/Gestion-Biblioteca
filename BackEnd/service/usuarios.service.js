const usuariosRepository = require('../repository/usuarios.repository')

exports.traerTodosUsuariosService = async () => {
    console.log('Usuarios Service - traerTodosUsuariosService')
    try{
        let datos = await usuariosRepository.traerTodosUsuariosRepository()
        return JSON.stringify(datos)
    }
    catch(error){
        console.log('ERROR en Service traerTodosUsuariosService')
        console.log(error)
    }
}

exports.traerUsuarioNombre = async (parametroNombre) => {
    console.log('Usuarios Service - traerUsuarioNombre')
    try{
        let datos = await usuariosRepository.traerUsuarioNombre(parametroNombre)
        return JSON.stringify(datos)
    } catch(error){
        console.log('ERROR en Service - traerUsuarioNombre')
        console.log(error)
    }
}

exports.traerUsuarioApellido = async (parametroApellido) => {
    console.log('Usuarios Service - traerUsuarioApellido')
    try{
        let datos = await usuariosRepository.traerUsuarioApellido(parametroApellido)
        return JSON.stringify(datos)
    } catch(error){
        console.log('ERROR en Service - traerUsuarioApellido')
        console.log(error)
    }
}

exports.traerUsuarioDNI = async (parametroDNI) => {
    console.log('Usuarios Service - traerUsuarioDNI')
    try{
        let datos = await usuariosRepository.traerUsuarioDNI(parametroDNI)
        return JSON.stringify(datos)
    } catch(error){
        console.log('ERROR en Service - traerUsuarioDNI')
        console.log(error)
    }
}

exports.traerUsuarioEmail = async (parametroEmail) => {
    console.log('Usuarios Service - traerUsuarioEmail')
    try{
        let datos = await usuariosRepository.traerUsuarioEmail(parametroEmail)
        return JSON.stringify(datos)
    } catch(error){
        console.log('ERROR en Service - traerUsuarioEmail')
        console.log(error)
    }
}

exports.traerUsuarioTelefono = async (parametroTelefono) => {
    console.log('Usuarios Service - UsuarioTelefono')
    try{
        let datos = await usuariosRepository.traerUsuarioTelefono(parametroTelefono)
        return JSON.stringify(datos)
    } catch(error){
        console.log('ERROR en Service - UsuarioTelefono')
        console.log(error)
    }
}