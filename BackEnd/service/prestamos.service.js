const prestamosRepository = require('../repository/prestamos.repository')

exports.traerTodosPrestamosService = async () => {
    console.log('Prestamos Service - traerTodosPrestamosService')
    try {
        let datos = await prestamosRepository.traerTodosPrestamosRepository()
        return JSON.stringify(datos)
    } catch (error) {
        console.log('ERROR en Service - traerTodosPrestamosService')
        console.log(error)
    }
}

exports.crearPrestamoService = async (pUsuarioId, pLibroId) => {
    console.log('Prestamos Service - crearPrestamoService')
    try {
        const fechaPrestamo = new Date()
        const fechaVencimiento = new Date()
        fechaVencimiento.setDate(fechaVencimiento.getDate() + 30) // suma 30 dias

        let datos = await prestamosRepository.crearPrestamoRepository(
            pUsuarioId,
            pLibroId,
            fechaPrestamo,
            fechaVencimiento
        )
        return JSON.stringify(datos)
    } catch (error) {
        console.log('ERROR en Service - crearPrestamoService')
        console.log(error)
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

exports.eliminarPrestamoService = async (pId) => {
    console.log('Prestamos Service - eliminarPrestamoService')
    try {
        let datos = await prestamosRepository.eliminarPrestamoRepository(pId)
        return JSON.stringify(datos)
    } catch (error) {
        console.log('ERROR en Service - eliminarPrestamoService')
        console.log(error)
    }
}

exports.traerPrestamoPorIdService = async (pId) => {
    console.log('Prestamos Service - traerPrestamoPorIdService')
    try {
        let datos = await prestamosRepository.traerPrestamoPorIdRepository(pId)
        return JSON.stringify(datos)
    } catch (error) {
        console.log('ERROR en Service - traerPrestamoPorIdService')
        console.log(error)
    }
}