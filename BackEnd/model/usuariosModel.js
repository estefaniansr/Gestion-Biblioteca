const mongoose = require('mongoose')

const usuariosSchema = mongoose.Schema(
    {
        _id:{type:Number, required:false},
        nombre:{
            type:String,
            required:true
        },
        apellido:{
            type:String,
            required:true
        },
        DNI:{
            type:Number,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true
        },
        telefono:{
            type:String,
            required:true
        }
    }, {strict: false, versionKey: false}
)

module.exports = mongoose.model('Usuarios', usuariosSchema, 'usuarios')