const { conexionAMongo } = require('../database/conect')
const Prestamos = require('../model/prestamosModel')
const Libros = require('../model/libros.model')

exports.traerTodosPrestamosRepository = async () => {
    try {
        console.log('Prestamos Repository - traerTodosPrestamos')
        const prestamos = await Prestamos.find()
            .populate('usuarioId', 'nombre apellido')
            .populate('libroId', 'libro autor')
        return prestamos
    } catch (error) {
        console.log('Error, no encontré préstamos', error)
        throw error
    }
}

exports.traerPrestamoPorIdRepository = async (pId) => {
    try {
    console.log('Prestamos Repository - traerPrestamoPorId')
        const prestamo = await Prestamos.findById(pId)
            .populate('usuarioId', 'nombre apellido')
            .populate('libroId', 'libro autor')

            if (!prestamo) {
            return null
        }
        return prestamo
    } catch (error) {
        console.log('ERROR en Prestamos Repository - traerPrestamoPorId', error)
        throw error
    }
}

exports.obtenerEstadisticasRepository = async () => {
    try {
        console.log('Prestamos Repository - obtenerEstadisticasRepository')
        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        const total = await Prestamos.countDocuments()
        const activos = await Prestamos.countDocuments({
            estado: 'Activo',
            fechaVencimiento: { $gte: hoy }
        })
        const entregados = await Prestamos.countDocuments({
            estado: 'Devuelto'
        })
        const vencidos = await Prestamos.countDocuments({
            $or: [
                { estado: 'Vencido' }, 
                { 
                    estado: 'Activo', 
                    fechaVencimiento: { $lt: hoy } 
                }
            ]
        })

        return { total, activos, entregados, vencidos }
    } catch (error) {
        console.log('Error en obtenerEstadisticasRepository', error)
        throw error
    }
}

exports.crearPrestamoRepository = async (pUsuarioId, pLibroId, pFechaPrestamo, pFechaVencimiento) => {
    try {
        console.log('Prestamos Repository - crearPrestamo')
        const nuevoPrestamo = await Prestamos.create({
            usuarioId: pUsuarioId,
            libroId: pLibroId,
            fechaPrestamo: pFechaPrestamo,
            fechaVencimiento: pFechaVencimiento,
            estado: 'Activo'
        })
        await nuevoPrestamo.save()
        return nuevoPrestamo
    } catch (error) {
        console.log('ERROR en Prestamos Repository - crearPrestamo', error)
        throw error
    }
}

exports.devolverLibroRepository = async (pId) => {
    try {
        console.log('Prestamos Repository - devolverLibro')
        const prestamo = await Prestamos.findByIdAndUpdate(
            pId,
            {
                $set: {
                    estado: 'Devuelto',
                    fechaDevolucion: new Date()
                }
            },
            { new: true }
        )

        if (!prestamo) {
            return null
        }

        return prestamo
    } catch (error) {
        console.log('ERROR en Prestamos Repository - devolverLibro', error)
        throw error
    }
}

exports.eliminarPrestamoRepository = async (pId) => {
    try {
        console.log('Prestamos Repository - eliminarPrestamo')
        const prestamo = await Prestamos.findByIdAndDelete(pId)

        if(!prestamo){
            return null
        }

        return prestamo
    } catch (error) {
        console.log('ERROR en Prestamos Repository - eliminarPrestamo', error)
        throw error
    }
}

exports.actualizarEstadoRepository = async (pId, pEstado) => {
    try {
        console.log('Prestamos Repository - actualizarEstado')
        const prestamo = await Prestamos.findByIdAndUpdate(
            pId,
            { $set: { estado: pEstado } },
            { new: true }
        )
        if (!prestamo) return null
        return prestamo
    } catch (error) {
        console.log('ERROR en Prestamos Repository - actualizarEstado', error)
        throw error
    }
}

