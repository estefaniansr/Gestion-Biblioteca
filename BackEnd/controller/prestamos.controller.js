const prestamosService = require('../service/prestamos.service')

exports.traerTodosPrestamosController = async (req, res) => {
    try {
        console.log('Prestamos Controller - traerTodosPrestamosController')
        const prestamos = await prestamosService.traerTodosPrestamosService()
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(JSON.stringify(prestamos))
    } catch (error) {
        console.log('ERROR en Prestamos Controller - traerTodosPrestamosController', error)
        res.status(500).send({
            code: 500,
            message: "ERROR en Prestamos Controller - traerTodosPrestamosController"
        })
    }
}

exports.traerPrestamoPorIdController = async (req, res) => {
    try {
        console.log('Prestamos Controller - traerPrestamoPorIdController')
        const id = req.params.id
        const prestamo = await prestamosService.traerPrestamoPorIdService(id)
        if (!prestamo) {
            return res.status(404).send(`No se encontró el préstamo con id: ${id}`)
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(JSON.stringify(prestamo))
    } catch (error) {
        console.log('ERROR en Prestamos Controller - traerPrestamoPorIdController', error)
        res.status(500).send({
            code: 500,
            message: "ERROR en Prestamos Controller - traerPrestamoPorIdController"
        })
    }
}

exports.obtenerEstadisticasController = async (req, res) => {
    try {
        console.log('Prestamos Controller - obtenerEstadisticasController')
        const estadisticas = await prestamosService.obtenerEstadisticasService()
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(JSON.stringify(estadisticas))
    } catch (error) {
        console.log('Error en obtenerEstadisticasController', error)
        res.status(500).send({
            code: 500,
            message: "Error al obtener las estadísticas"
        })
    }
}

exports.crearPrestamoController = async (req, res) => {
    try {
        console.log('Prestamos Controller - crearPrestamoController')
        const nuevoPrestamo = req.body
        const prestamo = await prestamosService.crearPrestamoService(
            nuevoPrestamo.usuarioId,
            nuevoPrestamo.libroId
        )
        res.status(200).send(JSON.stringify(prestamo))
    } catch (error) {
        console.log('ERROR en Prestamos Controller - crearPrestamoController', error)
        res.status(500).send({
            code: 500,
            message: "ERROR en Prestamos Controller - crearPrestamoController"
        })
    }
}

exports.devolverLibroController = async (req, res) => {
    try {
        console.log('Prestamos Controller - devolverLibroController')
        const id = req.params.id
        const prestamo = await prestamosService.devolverLibroService(id)
        if (!prestamo) {
            return res.status(404).send(`No se encontró el préstamo con id: ${id}`)
        }
        res.status(200).send(JSON.stringify(prestamo))
    } catch (error) {
        console.log('ERROR en Prestamos Controller - devolverLibroController', error)
        res.status(500).send({
            code: 500,
            message: "ERROR en Prestamos Controller - devolverLibroController"
        })
    }
}

exports.actualizarEstadoController = async (req, res) => {
    try {
        console.log('Prestamos Controller - actualizarEstadoController')
        const id = req.params.id
        const { estado } = req.body

        const prestamo = await prestamosService.actualizarEstadoService(id, estado)

        if (!prestamo) {
            return res.status(404).send(`No se encontró el préstamo con id: ${id}`)
        }

        res.status(200).send(JSON.stringify(prestamo))
    } catch (error) {
        console.log('Error en actualizarEstadoController', error)
        res.status(500).send({
            code: 500,
            message: "Error al actualizar el estado del préstamo"
        })
    }
}

exports.eliminarPrestamoController = async (req, res) => {
    try {
        console.log('Prestamos Controller - eliminarPrestamoController')
        const id = req.params.id
        const prestamo = await prestamosService.eliminarPrestamoService(id)

        if (!prestamo) {
            return res.status(404).send(`No se encontró el préstamo con id: ${id}`)
        }
        res.status(200).send(JSON.stringify(prestamo))
    } catch (error) {
        console.log('ERROR en Prestamos Controller - eliminarPrestamoController', error)
        res.status(500).send({
            code: 500,
            message: "ERROR en Prestamos Controller - eliminarPrestamoController"
        })
    }
}