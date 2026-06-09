const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const categoriasSchema = mongoose.Schema(
    {
        _id: { type: Number, required: false },
        nombre: {
            type: String,
            required: true
        },
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