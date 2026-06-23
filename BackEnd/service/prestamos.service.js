const prestamosRepository = require('../repository/prestamos.repository')

exports.traerTodosPrestamosService = async () => {
    try {
        console.log('Prestamos Service - traerTodosPrestamosService')
        return await prestamosRepository.traerTodosPrestamosRepository()
    } catch (error) {
        console.log('ERROR en Service - traerTodosPrestamosService', error)
    }
}

exports.traerPrestamoPorIdService = async (pId) => {
    try {
        console.log('Prestamos Service - traerPrestamoPorIdService')
        return await prestamosRepository.traerPrestamoPorIdRepository(pId)
    } catch (error) {
        console.log('ERROR en Service - traerPrestamoPorIdService', error)
    }
}

exports.obtenerEstadisticasService = async () => {
    try {
        console.log('Prestamos Service - obtenerEstadisticasService')
        return await prestamosRepository.obtenerEstadisticasRepository()
    } catch (error) {
        console.log('Error en obtenerEstadisticasService', error)
    }
}

exports.crearPrestamoService = async (pUsuarioId, pLibroId) => {
    try {
        console.log('Prestamos Service - crearPrestamoService')
        const fechaPrestamo = new Date()
        const fechaVencimiento = new Date()
        fechaVencimiento.setDate(fechaVencimiento.getDate() + 30) 

        return await prestamosRepository.crearPrestamoRepository(
            pUsuarioId,
            pLibroId,
            fechaPrestamo,
            fechaVencimiento
        )
    } catch (error) {
        console.log('ERROR en Service - crearPrestamoService', error)
    }
}

exports.devolverLibroService = async (pId) => {
    console.log('Prestamos Service - devolverLibroService')
    try {
        let datos = await prestamosRepository.devolverLibroRepository(pId)
        return JSON.stringify(datos)
    } catch (error) {
        console.log('ERROR en Service - devolverLibroService')
        console.log(error)
    }
}

exports.actualizarEstadoService = async (pId, pEstado) => {
    try {
        console.log('Prestamos Service - actualizarEstadoService')
        return await prestamosRepository.actualizarEstadoRepository(pId, pEstado)
    } catch (error) {
        console.log('Error en actualizarEstadoService', error)
    }
}

exports.eliminarPrestamoService = async (pId) => {
    try {
        console.log('Prestamos Service - eliminarPrestamoService')
        return await prestamosRepository.eliminarPrestamoRepository(pId)
    } catch (error) {
        console.log('ERROR en Service - eliminarPrestamoService', error)
    }
}

