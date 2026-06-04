const mongoose = require('mongoose')
const autoIncrementar = require('mongoose-sequence')(mongoose) // importar plugin para incrementar campos


const librosSchema = mongoose.Schema({ // collecion o schema de libros

    libro: {
        type: String,
        required: true // obligatorio
    },
    autor: {
        type: String,
        required: true
    },
    categoria: { // array de categorias
        type: [String],
        required: true
    },
})


module.exports = mongoose.model('Libros', librosSchema)