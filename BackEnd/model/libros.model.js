const mongoose = require('mongoose')


const librosSchema = mongoose.Schema({ // collecion o schema de libros

    libro: {
        type: String,
        required: true // obligatorio
    },
    autor: {
        type: String,
        required: true,

    },
    categoria: { // array de categorias
        type: [String],
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now // x defecto fecha de hoy
    }
})


module.exports = mongoose.model('Libros', librosSchema)