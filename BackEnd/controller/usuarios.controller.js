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

exports.traerUsuarioNombreController = async (req,res) => {
    console.log('Usuarios Controller - traerUsuarioNombre')
    try{
        let nombre = req.params.nombre
        nombre = nombre.toLowerCase();
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioNombreService(nombre))
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
    try{
        let apellido = req.params.apellido
        apellido = apellido.toLowerCase();
        apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioApellidoService(apellido))
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
        let dni = req.params.dni
        console.log(req.body)
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioDNIService(dni))
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
        let email = req.params.email
        email = email.toLowerCase()
        console.log(req.body)
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioEmailService(email))
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
        let telefono = req.params.telefono
        console.log(req.body)
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerUsuarioTelefonoService(telefono))
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

exports.crearUsuarioController = async (req,res) =>{
    console.log('Usuarios Controller - crearUsuarioController')
    try{
        let nuevo = req.body
        res.status(200)
        res.send(await usuariosService.crearUsuarioService(nuevo.nombre, nuevo.apellido, nuevo.DNI, nuevo.email, nuevo.telefono))
    }
    catch(error){
        console.log('ERROR en Usuarios Usuarios Controller - crearUsuarioController')
        console.log(error)
        res.status(500).send({
            code:500,
            message:"ERROR en Usuarios Usuarios Controller - crearUsuarioController"
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