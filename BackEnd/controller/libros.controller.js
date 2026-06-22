const librosService = require('../service/libros.service')

exports.obtenerLibrosController = async (req, res) => {

    try {
        res.setHeader('Content-Type', 'application/json') 
        res.status(200).send( 
            await librosService.obtenerLibrosService() 
        )
    }

    catch (err) {
        console.error('Err en obtenerLibrosController ', err)
        res.status(500).send({
            code: 500,
            message: "error al usar el controller"
        })
    }
}


exports.crearLibroController = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json')
        const nuevoLibro = await librosService.crearLibroService(req.body) 
        res.status(200).send(nuevoLibro)
    } catch (err) {
        console.error('Err en crearLibroController ', err)
        res.status(500).send({
            code: 500,
            message: "error al usar el controller"
        })
    }
}

exports.editarLibroController = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json')
        const id = req.params.id 
        const datos = req.body 
        const libtoEditado = await librosService.editarLibroService(id, datos)
        res.status(200).send(libtoEditado)
    } catch (err) {
        console.log("error en editarLibroController", err)
        res.status(500).send({ code: 500, message: "Error al usar el controlelr" })
    }
}

exports.eliminarLibroController = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json')
        const id = req.params.id
        res.status(200).send(await librosService.eliminarLibroService(id))
    } catch (err) {
        console.error('Err en eliminarLibroController ', err)
        res.status(500).send({
            code: 500,
            message: "error al usar el controller"
        })
    }
}

exports.buscarLibroController = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json')
        const { input = '' } = req.query
        /* 
        * {input = ''} -> destructuring, si no existe el input, usa el string vacio
        */
        const libroBuscado = await librosService.buscarLibroService(input)
        res.status(200).send(libroBuscado)

    }
    catch (err) {
        console.error('Err en buscarLibroController ', err)
        res.status(500).send({
            code: 500,
            message: "error al usar el controller"
        })
    }
}