const { conexionAMongo } = require('../database/conect')
const Prestamos = require('../model/prestamosModel')
const mongoose = require('mongoose')

conexionAMongo()

async function sumarUno() {
    try {
        let contador = await Prestamos.findOneAndUpdate(
            { contador: 'prestamos' },
            { $inc: { valor: 1 } },
            { returnDocument: 'after' }
        )
        return contador.valor
    } catch (error) {
        console.log(error)
    }
}

exports.traerTodosPrestamosRepository = async () => {
    console.log('Prestamos Repository - traerTodosPrestamos')
    try {
        const prestamos = await Prestamos.find(
            { contador: { $exists: false } }
        )
        .populate('usuarioId', 'nombre apellido')
        .populate('libroId', 'titulo autor')
        return prestamos
    } catch (error) {
        console.log('Error, no encontré préstamos')
        throw Error(error)
    }
}

exports.crearPrestamoRepository = async (pUsuarioId, pLibroId, pFechaPrestamo, pFechaVencimiento) => {
    console.log('Prestamos Repository - crearPrestamo')
    try {
        let contador = await sumarUno()
        let nuevo = await Prestamos.create({
            _id: contador,
            usuarioId: pUsuarioId,
            libroId: pLibroId,
            fechaPrestamo: pFechaPrestamo,
            fechaVencimiento: pFechaVencimiento,
            estado: 'Activo'
        })
        return nuevo
    } catch (error) {
        console.log('ERROR en Prestamos Repository - crearPrestamo')
        throw Error(error)
    }
}

exports.devolverLibroRepository = async (pId) => {
    console.log('Prestamos Repository - devolverLibro')
    try {
        let prestamo = await Prestamos.findByIdAndUpdate(
            pId,
            {
                $set: {
                    estado: 'Devuelto',
                    fechaDevolucion: new Date()
                }
            },
            { returnDocument: 'after' }
        )
        return prestamo
    } catch (error) {
        console.log('ERROR en Prestamos Repository - devolverLibro')
        throw Error(error)
    }
}

exports.eliminarPrestamoRepository = async (pId) => {
    console.log('Prestamos Repository - eliminarPrestamo')
    try {
        let prestamo = await Prestamos.findByIdAndDelete(pId)
        return prestamo
    } catch (error) {
        console.log('ERROR en Prestamos Repository - eliminarPrestamo')
        throw Error(error)
    }
}

exports.traerPrestamoPorIdRepository = async (pId) => {
    console.log('Prestamos Repository - traerPrestamoPorId')
    try {
        let prestamo = await Prestamos.findById(pId)
            .populate('usuarioId', 'nombre apellido')
            .populate('libroId', 'titulo autor')
        return prestamo
    } catch (error) {
        console.log('ERROR en Prestamos Repository - traerPrestamoPorId')
        throw Error(error)
    }
}
