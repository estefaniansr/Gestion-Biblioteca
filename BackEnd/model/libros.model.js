const mongoose = require('mongoose')


const librosSchema = mongoose.Schema({

    libro: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true,

    },
    categoria: {
        type: [String],
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('Libros', librosSchema)