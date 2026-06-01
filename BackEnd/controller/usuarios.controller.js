const usuariosService = require('../service/usuarios.service')

exports.traerTodosUsuariosController = async (req,res) => {
    console.log('Usuarios Controller - traerTodosUsuariosController')
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

exports.traerUsuarioNombre = async (req,res) => {
    console.log('Usuarios Controller - traerUsuarioNombre')
    try{
        let nombre = req.params.nombre
        nombre = nombre.toLowerCase();
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioNombre(nombre))
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

exports.traerUsuarioApellido = async (req,res) => {
    console.log('Usuarios Controller - traerUsuarioApellido')
    try{
        let apellido = req.params.apellido
        apellido = apellido.toLowerCase();
        apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioApellido(apellido))
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

exports.traerUsuarioDNI = async (req,res) => {
    console.log('Usuarios Controller - traerUsuarioDNI')
    try{
        let dni = req.params.dni
        console.log(req.body)
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioDNI(dni))
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

exports.traerUsuarioEmail = async (req,res) => {
    console.log('Usuarios Controller - traerUsuarioEmail')
    try{
        let email = req.params.email
        email = email.toLowerCase()
        console.log(req.body)
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioEmail(email))
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

exports.traerUsuarioTelefono = async (req,res) => {
    console.log('Usuarios Controller - traerUsuarioTelefono')
    try{
        let telefono = req.params.telefono
        console.log(req.body)
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioTelefono(telefono))
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