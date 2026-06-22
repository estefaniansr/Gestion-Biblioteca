const mongoose = require('mongoose')

const prestamosSchema = mongoose.Schema(
    {
        usuarioId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true
        },
        libroId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Libros',
            required: true
        },
        fechaPrestamo: {
            type: Date,
            required: true,
            default: Date.now
        },
        fechaVencimiento: {
            type: Date,
            required: true
        },
        fechaDevolucion: {
            type: Date,
            required: false
        },
        estado: {
            type: String,
            enum: ['Activo', 'Devuelto', 'Vencido'],
            default: 'Activo',
            required: true
        }
    }
)

module.exports = mongoose.model('Prestamos', prestamosSchema, 'prestamos')

// comentar lo de ObjectId
