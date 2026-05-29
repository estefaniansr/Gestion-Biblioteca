const usuariosService = require('../service/usuarios.service')

exports.traerTodosUsuariosController = async (req,res) => {
    try{
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await usuariosService.traerTodosUsuariosService())
    }
    catch(error){
        console.log('Error en traerTodosUsuariosController')
        console.log(error)
        res.status(500).send({
            code:500,
            message:"Error al utilizar el controller"
        })
    }
}