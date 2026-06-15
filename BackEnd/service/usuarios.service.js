const usuariosRepository = require('../repository/usuarios.repository')

const {separador} = require('../utils/separador')

const {normalizar, normalizarEmail} = require('../utils/usuarios.utils')


exports.traerTodosUsuariosService = async () => {
    console.log('Usuarios Service - traerTodosUsuariosService')
    separador()

    try{
        let datos = await usuariosRepository.traerTodosUsuariosRepository()
        return JSON.stringify(datos)
    }
    catch(error){
        console.log('ERROR en Service traerTodosUsuariosService')
        separador()
        console.log(error)
        throw error
    }
}

exports.traerUsuarioIdService = async (pId) => {
    console.log('Usuarios Repository - traerUsuarioId')
    separador()

    try{

        let datos = await usuariosRepository.traerUsuarioId(pId)
        
        return JSON.stringify(datos)
        
    }
    catch(error){
        console.log('Error en Service - traerUsuarioIdService')
        separador()
        console.log(error)
    }
}

exports.crearUsuarioService = async (parametroBody) => {
    console.log('Usuarios Service - crearUsuarioService')  
    separador()

    try{
        let datos = {
            nombre: normalizar(parametroBody.nombre),
            apellido: normalizar(parametroBody.apellido),
            DNI: Number(parametroBody.DNI),
            email: normalizarEmail(parametroBody.email),
            telefono: Number(parametroBody.telefono)
        }

        let respuesta = await usuariosRepository.crearUsuario(datos.nombre, datos.apellido, datos.DNI, datos.email, datos.telefono)
        return JSON.stringify(respuesta)
    }
    catch(error){
        console.log('ERROR en Service - crearUsuarioService')
        separador()
        console.log(error)
        throw error
    }
}

exports.modificarUsuarioService = async (pDNI, parametroClave, parametroValor) =>{
    console.log('Usuarios Service - modificarUsuarioService')
    separador()

    try{
        let datos = 
        {
            DNI: Number(pDNI),
            parametroClave: normalizarEmail(parametroClave),
            parametroValor: parametroValor
        }

        if(datos.parametroClave == 'email'){
            datos.parametroValor = normalizarEmail(datos.parametroValor)
        }
        else {
            datos.parametroValor = normalizar(datos.parametroValor)
        }

        let respuesta = await usuariosRepository.modificarUsuario(datos.DNI, datos.parametroClave, datos.parametroValor)
        return JSON.stringify(respuesta)

    }
    catch(error){
        console.log('ERROR en Service - modificarUsuarioService')
        separador()
        console.log(error)
        throw error
    }
}

exports.eliminarUsuarioService = async (pDNI) => {
    console.log('Usuarios Service - eliminarUsuarioService')
    separador()

    try{   
        let datos = Number(pDNI)
        let respuesta = await usuariosRepository.eliminarUsuario(datos)
        return JSON.stringify(respuesta)
    }
    catch(error){
        console.log('ERROR en Service - eliminarUsuarioService')
        separador()
        console.log(error)
        throw error
    }
}

exports.traerUsuarioService = async (parametro) => {
    console.log('Usuarios Service - traerUsuarioService')
    separador()

    try{
        let datos = parametro

        if(!isNaN(parametro)){
            Number(parametro)
        }

        if(parametro.includes("@")){
            datos = normalizarEmail(datos)
        }

        else{
            datos = normalizar(datos)
        }
        let respuesta = await usuariosRepository.traerUsuario(datos)
        return JSON.stringify(respuesta)
    }
    catch(error){
        console.log('error')
        console.log(error)
        throw error
    }
}

/*
exports.traerUsuarioNombreService = async (parametroNombre) => {
    console.log('Usuarios Service - traerUsuarioNombre')
    separador()

    try{
        let datos = normalizar(parametroNombre)
        let respuesta = await usuariosRepository.traerUsuarioNombre(datos)
        return JSON.stringify(respuesta)
    }
    catch(error){
        console.log('ERROR en Service - traerUsuarioNombreService')
        separador()
        console.log(error)
        throw error
    }
}

exports.traerUsuarioApellidoService = async (parametroApellido) => {
    console.log('Usuarios Service - traerUsuarioApellido')
    separador()

    try{
        let datos = normalizar(parametroApellido)
        let respuesta = await usuariosRepository.traerUsuarioApellido(datos)
        return JSON.stringify(respuesta)
    }
    catch(error){
        console.log('ERROR en Service - traerUsuarioApellidoService')
        separador()
        console.log(error)
        throw error
    }
}

exports.traerUsuarioDNIService = async (parametroDNI) => {
    console.log('Usuarios Service - traerUsuarioDNI')
    separador()

    try{
        let datos = Number(parametroDNI)
        let respuesta = await usuariosRepository.traerUsuarioDNI(datos)
        return JSON.stringify(respuesta)
    }
    catch(error){
        console.log('ERROR en Service - traerUsuarioDNIService')
        separador()
        console.log(error)
        throw error
    }
}

exports.traerUsuarioEmailService = async (parametroEmail) => {
    console.log('Usuarios Service - traerUsuarioEmail')
    separador()

    try{
        let datos = normalizarEmail(parametroEmail)
        let respuesta = await usuariosRepository.traerUsuarioEmail(datos)
        return JSON.stringify(respuesta)
    }
    catch(error){
        console.log('ERROR en Service - traerUsuarioEmailService')
        separador()
        console.log(error)
        throw error
    }
}

exports.traerUsuarioTelefonoService = async (parametroTelefono) => {
    console.log('Usuarios Service - UsuarioTelefono')
    separador()
    try{
        let datos = Number(parametroTelefono)
        let respuesta = await usuariosRepository.traerUsuarioTelefono(datos)
        return JSON.stringify(respuesta)
    }
    catch(error){
        console.log('ERROR en Service - traerUsuarioTelefonoService')
        separador()
        console.log(error)
        throw error
    }
}
*/