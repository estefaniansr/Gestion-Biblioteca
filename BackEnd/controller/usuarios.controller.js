const usuariosService = require('../service/usuarios.service')

const {separador} = require('../utils/separador')

exports.traerTodosUsuariosController = async (req,res) => {
    console.log('Usuarios Controller - traerTodosUsuariosController')
    separador()
    try{
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerTodosUsuariosService())
    }
    catch(error){
        console.log('ERROR en Usuarios Controller - traerTodosUsuariosController')
        console.log(error)
        res.status(500).send({
            code:500,
            message:"Error Usuarios Controller - traerTodosUsuariosController"
        })
    }
}

exports.traerUsuarioIdController = async(req,res) => {
    console.log('Usuarios Controller - traerUsuarioId')
    separador()

    try{
        let respuesta = await usuariosService.traerUsuarioIdService(req.params.id)
        res.status(200)
        res.send(respuesta)
    }
    catch(error){
        console.log('Error en Controller - traerUsuarioId')
        separador()
        res.status(500).send({
            code:500,
            message:'Error al traer usuario por id'
        })
    }
}

exports.crearUsuarioController = async (req,res) =>{
    console.log('Usuarios Controller - crearUsuarioController')
    try{
        let respuesta = await usuariosService.crearUsuarioService(req.body)
        return res.status(200).send(respuesta)
    }
    catch(error){
        console.log('ERROR en crearUsuarioController')
        console.log(error)

        if (error.code === 11000) {
            return res.status(409).send({
                code: 409,
                message: "DNI DUPLICADO"
            })
        }

        return res.status(500).send({
            code: 500,
            message: "ERROR interno del servidor"
        })
    }
}

exports.modificarUsuarioController = async (req,res) => {
    console.log('Usuarios Controller - modificarUsuarioController')
    try{
        let dni = req.params.dni
        let nuevo = req.body

        let clave = Object.keys(nuevo)[0]
        let valor = nuevo[clave]

        console.log(`Clave: ${clave}, Valor: ${valor}`)

        res.status(200)
        res.send(await usuariosService.modificarUsuarioService(dni, clave, valor))
    }
    catch(error){
        console.log('ERROR en Usuarios Controller - modificarUsuarioController')
        console.log(error)
        res.status(500).send({
            code:500,
            message:"ERROR en Usuarios Usuarios Controller - modificarUsuarioController"
        })
    }
}

exports.borrarUsuario = async (req,res) =>{
    console.log('Usuarios Controller - modificarUsuarioController')
    separador()

    try{
        res.status(200)
        res.send(await usuariosService.eliminarUsuarioService(req.params.dni))
    }
    catch(error){
        console.log('ERROR en Controller - borrarUsuario')
        console.log(error)
        res.status(500).send({
            code:500,
            message:"Error en borrarUsuario"
        })
    }
}

exports.traerUsuarioController = async (req,res) => {
    console.log('tuvieja')
    separador()
    
    try{
        let datos = req.params.buscar
        res.status(200)
        res.send(await usuariosService.traerUsuarioService(datos))

    }
    catch(error){
        console.log('error')
        console.log(error)
        res.status(500).send({
            code:500,
            message:'Error'
        })
    }
}

/*
exports.traerUsuarioNombreController = async (req,res) => {
    console.log('Usuarios Controller - traerUsuarioNombre')
    separador()
    try{
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioNombreService(req.params.nombre))
    }
    catch(error)
    {
        console.log('ERROR en Usuarios Controller - traerUsuarioNombre')
        console.log(error)
        res.status(500).send({
            code:500,
            message:"ERROR en Usuarios Controller - traerUsuarioNombre"
        })
    }
}

exports.traerUsuarioApellidoController = async (req,res) => {
    console.log('Usuarios Controller - traerUsuarioApellido')
    separador()
    try{
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioApellidoService(req.params.apellido))
    }
    catch(error)
    {
        console.log('ERROR en Usuarios Controller - traerUsuarioApellido')
        console.log(error)
        res.status(500).send({
            code:500,
            message:"ERROR en Usuarios Controller - traerUsuarioApellido"
        })
    }
}

exports.traerUsuarioDNIController = async (req,res) => {
    console.log('Usuarios Controller - traerUsuarioDNI')
    try{
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioDNIService(req.params.dni))
    }
    catch(error)
    {
        console.log('ERROR en Usuarios Usuarios Controller - traerUsuarioDNI')
        console.log(error)
        res.status(500).send({
            code:500,
            message:"ERROR en Usuarios Usuarios Controller - traerUsuarioDNI"
        })
    }
}

exports.traerUsuarioEmailController = async (req,res) => {
    console.log('Usuarios Controller - traerUsuarioEmail')
    try{
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioEmailService(req.params.email))
    }
    catch(error)
    {
        console.log('ERROR en Usuarios Usuarios Controller - traerUsuarioEmail')
        console.log(error)
        res.status(500).send({
            code:500,
            message:"ERROR en Usuarios Usuarios Controller - traerUsuarioEmail"
        })
    }
}

exports.traerUsuarioTelefonoController = async (req,res) => {
    console.log('Usuarios Controller - traerUsuarioTelefono')
    try{
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioTelefonoService(req.params.telefono))
    }
    catch(error)
    {
        console.log('ERROR en Usuarios Usuarios Controller - traerUsuarioTelefono')
        console.log(error)
        res.status(500).send({
            code:500,
            message:"ERROR en Usuarios Usuarios Controller - traerUsuarioTelefono"
        })
    }
}
*/