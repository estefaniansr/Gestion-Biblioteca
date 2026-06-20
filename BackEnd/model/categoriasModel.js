const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const categoriasSchema = mongoose.Schema(
    {
        
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            default: ''
        },

    }, {
    timestamps: true
}
)
module.exports = mongoose.model('Categorias',categoriasSchema)