const mongoose = require('mongoose')

const prestamosSchema = mongoose.Schema(
    {
        _id: { 
            type: Number, 
            required: false 
        },
        usuarioId: {
            type: Number,
            ref: 'Usuarios',
            required: true
        },
        libroId: {
            type: Number,
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
    },
    { strict: false, versionKey: false }
)

module.exports = mongoose.model('Prestamos', prestamosSchema, 'prestamos')

// comentar lo de ObjectId
