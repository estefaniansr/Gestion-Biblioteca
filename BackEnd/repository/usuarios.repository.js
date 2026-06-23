const { ReturnDocument } = require('mongodb')
const { conexionAMongo } = require('../database/conect')

const Usuarios = require('../model/usuarios.model')
const { separador } = require('../utils/separador')

exports.traerTodosUsuariosRepository = async () => {
    console.log('Usuarios Repository - traerTodosUsuarios')
    try{
        const usuarios = await Usuarios.find({contador: {$ne: 'usuarios'}})
        return usuarios
    }
    catch(error){
        console.log('Error, no encontre usuarios')
        throw Error(error)
    }
}

exports.traerUsuario = async (parametro) => {
    console.log('Usuarios Repository - traerUsuario')
    separador()

    try{

        let flexible = new RegExp(parametro, 'i')

        let busqueda = [
            {nombre: flexible},
            {apellido: flexible},
            {email:flexible},    
        ]

        if(!isNaN(parametro)){
            busqueda.push({DNI: parametro})
            busqueda.push({telefono: parametro})
        }

        let usuarios = await Usuarios.find({$or:busqueda})
        return usuarios
    }
    catch(error){
        console.log('error')
        console.log(error)
        throw error
    }
}

exports.traerUsuarioId = async (pId) => {
    console.log('Usuarios Repository - traerUsuarioId')
    separador()

    try{

        let respuesta = await Usuarios.findById(pId)
        return respuesta

    }
    catch(error){
        console.log('Error en Repository - traerUsuarioId')
        separador()
        console.log(error)
    }
}

exports.crearUsuario = async (datos) => {
    console.log('Usuarios Repository - crearUsuario')
    try{
            let nuevo = await Usuarios.create({nombre: datos.nombre, apellido:datos.apellido, DNI:datos.DNI, email:datos.email, telefono:datos.telefono})
            console.log(nuevo)
            return nuevo
    }
    catch(error){
        console.log('ERROR en Usuarios Repository - crearUsuario')
        throw error
    }
}

exports.modificarUsuario = async (pId, pDatos) => {
   console.log('Usuarios Service - modificarUsuario')
   separador()
   
   try{

    let usuario = await Usuarios.findByIdAndUpdate(pId, pDatos, {returnDocument: "after"})
    return usuario
}
   catch(error){
    console.log('Error en Repository - modificarUsuario')
    separador()
    console.log(error)
   }
}

/* exports.modificarUsuario = async (pDNI, parametroClave, parametroValor) => {
    console.log('Usuarios Service - modificarUsuario')
    try{
        let usuarioModificado = {}

        usuarioModificado.clave = parametroClave.toLowerCase()

        usuarioModificado.valor = parametroValor.toLowerCase()

        usuarioModificado.valor = usuarioModificado.valor.charAt(0).toUpperCase() + usuarioModificado.valor.slice(1)

        let usuario_A_Modificar = await Usuarios.findOneAndUpdate({DNI: `${pDNI}`}, {$set: {[usuarioModificado.clave]: usuarioModificado.valor}}, {returnDocument: "after"})
        
        console.log(usuario_A_Modificar)
        return usuario_A_Modificar
    }
    catch(error){
        console.log('ERROR En Repository - modificarUsuario')
        console.log(`No se modifico el usuario con el DNI${pDNI}`)
        console.log('error')
    }
} */

exports.eliminarUsuario = async (pId) => {
    console.log('Usuarios Repository - eliminarUsuario')
    try{
        let usuarioEliminar = await Usuarios.findByIdAndDelete(pId)
        console.log(usuarioEliminar)
        return usuarioEliminar
    }
    catch(error){
        console.log('ERROR En Repository- eliminarUsuario')
        console.log(error)
    }
}

/* Estos metodos ya no se utilizan porque se implemento una busqueda flexible

exports.traerUsuarioNombre = async (parametroNombre) => {
    console.log('Usuarios Repository - traerUsuarioNombre')
    try{
        let usuarios = await Usuarios.find({nombre: `${parametroNombre}`})
        return usuarios
    }
    catch(error){
        console.log('error')
        throw Error(error)
    }
}

exports.traerUsuarioApellido = async (parametroApellido) => {
    console.log('Usuarios Repository - traerUsuarioApellido')
    try{
        let usuarios = await Usuarios.find({apellido: `${parametroApellido}`})
        return usuarios
    }
    catch(error){
        console.log('error')
        throw Error(error)
    }
}

exports.traerUsuarioDNI = async (parametroDNI) => {
    console.log('Usuarios Repository - traerUsuarioDNI')
    try{
        let usuarios = await Usuarios.find({ DNI: `${parametroDNI}` })
        return usuarios
    }
    catch(error){
        console.log('error')
        throw Error(error)
    }
}

exports.traerUsuarioEmail = async (parametroEmail) => {
    console.log('Usuarios Repository - traerUsuarioEmail')
    try{
        let usuarios = await Usuarios.find({email: `${parametroEmail}`})
        return usuarios
    }
    catch(error){
        console.log('error')
        throw Error(error)
    }
}

exports.traerUsuarioTelefono = async (parametroTelefono) => {
    console.log('Usuarios Repository - traerUsuarioTelefono')
    try{
        let usuarios = await Usuarios.find({telefono: `${parametroTelefono}`})
        return usuarios
    }
    catch(error){
        console.log('error')
        throw Error(error)
    }
}
*/
