
const libros = require('../model/libros.model') // importar el objeto de libros

// Exporta una función asíncrona
exports.obtenerLibrosRepository = async () => {

    console.log('MongoDB Repository - obtener libros')

    try { // manejo de errores

        const resultadoLibros = await libros.find()
        /*
        * busca todo los documentos de la coleccion
        * await espera la res de mongoDB
        * find() devuelve un array
        */
        return resultadoLibros // retorna los libros encontrados

    } catch (error) {

        console.error('Error, no encontre libros')

        throw Error(error) // lanza el err para que pueda manejarse en otras capas, corta le ejecucion
    }
}

exports.editarLibroRepository = async (id, datos) => {
    console.log("Editando libro:", id)
    console.log("Datos antes de editar")
    console.table(datos)

    try {
        const libroEditado = await libros.findByIdAndUpdate( // busca en el objeto libros por ID y lo actualiza
            id, datos, // le pasa el id que busca y los datos que actualiza
            {
                returnDocument: 'after'
            }
        )
        console.log("Datos editados")
        console.table(libroEditado)
        return libroEditado

    } catch (err) {
        console.log("Error editando el libro", id)
        throw Error(err)
    }
}

exports.crearLibroRepository = async (datos) => {
    console.log(' repository crear libro')

    try {
        const nuevoLibro = await libros.create({ // .create crea un nuevo documento
            libro: datos.libro,
            autor: datos.autor,
            categoria: datos.categoria,
            fechaCreacion: datos.fechaCreacion
        })
        return nuevoLibro
    } catch (err) {
        console.log("error no se pudo crear libros")
        throw Error(err)
    }
}

exports.eliminarLibroRepository = async (id) => {
    console.log('Repository eliminar libro')
    try {
        const libroEliminado = await libros.findByIdAndDelete(id) // Busca un libro por su ID y lo elimina 

        if (!libroEliminado) throw new Error('Libro no encontrado')
    } catch (err) {
        console.log("error no se pudo eliminar el libro")
        throw Error(err)
    }
}

exports.buscarLibroRepository = async (input) => {
    console.log("repository buscar libro")
    try {
        const flexible = new RegExp(input, 'i')
        /*
        * RegExp -> objeto de js para buscar patrones de texto
        * input -> primer parametro, lo q escribe el usuario
        * i -> es una flag, ignore case, ignora si es mayus o minus
        */

        const libro = await libros.find({
            $or: [ // or busca si se cumple al menos una conidicon
                {
                    libro: flexible
                },
                {
                    autor: flexible
                },
                {
                    categoria: flexible
                }
            ]

        })
        return libro
    }
    catch (err) {
        console.log("error no se pudo buscar el libro")
        throw Error(err)
    }
}