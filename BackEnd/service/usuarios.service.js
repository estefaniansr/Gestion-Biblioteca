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

exports.traerUsuarioNombreService = async (parametroNombre) => {
    console.log('Usuarios Service - traerUsuarioNombre')
    try{
        let datos = await usuariosRepository.traerUsuarioNombre(parametroNombre)
        return JSON.stringify(datos)
    } catch(error){
        console.log('ERROR en Service - traerUsuarioNombreService')
        console.log(error)
    }
}

exports.traerUsuarioApellidoService = async (parametroApellido) => {
    console.log('Usuarios Service - traerUsuarioApellido')
    try{
        let datos = await usuariosRepository.traerUsuarioApellido(parametroApellido)
        return JSON.stringify(datos)
    } catch(error){
        console.log('ERROR en Service - traerUsuarioApellidoService')
        console.log(error)
    }
}

exports.traerUsuarioDNIService = async (parametroDNI) => {
    console.log('Usuarios Service - traerUsuarioDNI')
    try{
        let datos = await usuariosRepository.traerUsuarioDNI(parametroDNI)
        return JSON.stringify(datos)
    } catch(error){
        console.log('ERROR en Service - traerUsuarioDNIService')
        console.log(error)
    }
}

exports.traerUsuarioEmailService = async (parametroEmail) => {
    console.log('Usuarios Service - traerUsuarioEmail')
    try{
        let datos = await usuariosRepository.traerUsuarioEmail(parametroEmail)
        return JSON.stringify(datos)
    } catch(error){
        console.log('ERROR en Service - traerUsuarioEmailService')
        console.log(error)
    }
}

exports.traerUsuarioTelefonoService = async (parametroTelefono) => {
    console.log('Usuarios Service - UsuarioTelefono')
    try{
        let datos = await usuariosRepository.traerUsuarioTelefono(parametroTelefono)
        return JSON.stringify(datos)
    } catch(error){
        console.log('ERROR en Service - traerUsuarioTelefonoService')
        console.log(error)
    }
}

exports.crearUsuarioService = async (pNombre, pApellido, pDNI, pEmail, pTelefono) => {
    console.log('Usuarios Service - crearUsuarioService')  
    try{
        let datos = await usuariosRepository.crearUsuario(pNombre, pApellido, pDNI, pEmail, pTelefono)
        return JSON.stringify(datos)
    }
    catch(error){
        console.log('ERROR en Service - crearUsuarioService')
        console.log(error)
    }
}

exports.modificarUsuarioService = async (pDNI, parametroClave, parametroValor) =>{
    console.log('Usuarios Service - modificarUsuarioService')
    try{
        let datos = await usuariosRepository.modificarUsuario(pDNI, parametroClave, parametroValor)
        return JSON.stringify(datos)
    }
    catch(error){
        console.log('ERROR en Service - modificarUsuarioService')
    }
}