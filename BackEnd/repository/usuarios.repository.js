const { ReturnDocument } = require('mongodb')
const { conexionAMongo } = require('../database/conect')

const Usuarios = require('../model/usuariosModel')

conexionAMongo()

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

exports.crearUsuario = async (pNombre, pApellido, pDNI, pEmail, pTelefono) => {
    console.log('Usuarios Repository - crearUsuario')
    try{
        // let dniARevisar = await revisarDNI(pDNI)
        // if(dniARevisar == true){
        //     console.log(`No se puede crear un usuario con este DNI: ${pDNI}`)
        // }
        // else{
            let contador = await sumarUno()
            let nuevo = await Usuarios.create({_id: contador, nombre: pNombre, apellido:pApellido, DNI:pDNI, email:pEmail, telefono:pTelefono})
            console.log(nuevo)
            return nuevo
        // }

    }
    catch(error){
        console.log('ERROR en Usuarios Repository - crearUsuario')
        throw error
    }
}


async function sumarUno(){
    try{
        let contador = await Usuarios.findOneAndUpdate({contador: 'usuarios'}, {$inc: {valor: 1}}, {returnDocument: 'after'})
        return contador.valor
    }
    catch(error){
        console.log(error)
    }
}

exports.modificarUsuario = async (pDNI, parametroClave, parametroValor) => {
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
}

exports.eliminarUsuario = async (pDNI) => {
    console.log('Usuarios Repository - eliminarUsuario')
    try{
        let usuarioEliminar = await Usuarios.deleteOne({DNI: pDNI} , {returnDocument: "after"})
        console.log(usuarioEliminar)
        return usuarioEliminar
    }
    catch(error){
        console.log('ERROR En Repository- eliminarUsuario')
        console.log(error)
    }
}



