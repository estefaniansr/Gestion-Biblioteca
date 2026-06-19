const prestamosService = require('../service/prestamos.service')

exports.traerTodosPrestamosController = async (req, res) => {
    console.log('Prestamos Controller - traerTodosPrestamosController')
    try {
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await prestamosService.traerTodosPrestamosService())
    } catch (error) {
        console.log('ERROR en Prestamos Controller - traerTodosPrestamosController')
        console.log(error)
        res.status(500).send({
            code: 500,
            message: "ERROR en Prestamos Controller - traerTodosPrestamosController"
        })
    }
}

exports.traerPrestamoPorIdController = async (req, res) => {
    console.log('Prestamos Controller - traerPrestamoPorIdController')
    try {
        let id = req.params.id
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await prestamosService.traerPrestamoPorIdService(id))
    } catch (error) {
        console.log('ERROR en Prestamos Controller - traerPrestamoPorIdController')
        console.log(error)
        res.status(500).send({
            code: 500,
            message: "ERROR en Prestamos Controller - traerPrestamoPorIdController"
        })
    }
}

exports.crearPrestamoController = async (req, res) => {
    console.log('Prestamos Controller - crearPrestamoController')
    try {
        let nuevo = req.body
        res.status(200)
        res.send(await prestamosService.crearPrestamoService(
            nuevo.usuarioId,
            nuevo.libroId
        ))
    } catch (error) {
        console.log('ERROR en Prestamos Controller - crearPrestamoController')
        console.log(error)
        res.status(500).send({
            code: 500,
            message: "ERROR en Prestamos Controller - crearPrestamoController"
        })
    }
}

exports.devolverLibroController = async (req, res) => {
    console.log('Prestamos Controller - devolverLibroController')
    try {
        let id = req.params.id
        res.status(200)
        res.send(await prestamosService.devolverLibroService(id))
    } catch (error) {
        console.log('ERROR en Prestamos Controller - devolverLibroController')
        console.log(error)
        res.status(500).send({
            code: 500,
            message: "ERROR en Prestamos Controller - devolverLibroController"
        })
    }
}

exports.eliminarPrestamoController = async (req, res) => {
    console.log('Prestamos Controller - eliminarPrestamoController')
    try {
        let id = req.params.id
        res.status(200)
        res.send(await prestamosService.eliminarPrestamoService(id))
    } catch (error) {
        console.log('ERROR en Prestamos Controller - eliminarPrestamoController')
        console.log(error)
        res.status(500).send({
            code: 500,
            message: "ERROR en Prestamos Controller - eliminarPrestamoController"
        })
    }
}