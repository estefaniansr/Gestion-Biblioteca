const librosService = require('../service/libros.service')

exports.obtenerLibrosController = async (req, res) => {
    /*
    * exporta una funcion asyncronica
    * parametros -> req = request, res = response
     */

    try {
        res.setHeader('Content-Type', 'application/json') // topo contenido de la res http
        res.status(200).send( // devuelve estado 200 y envia
            await librosService.obtenerLibrosService() // espera y ejecuta el obtenerLibrosService
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
        const nuevoLibro = await librosService.crearLibroService(req.body) // espera la respuesta pasando los datos del front req.body
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
        const id = req.params.id // saca el id de los parametros de la URL
        const datos = req.body // obtiene los datos enviados desde el front en forma de objeto
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
        const id = req.params.id // toma el id desde la url /libros/:id
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
        *  req.query -> trae los parametros de la url
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