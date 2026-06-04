const libros = require('../model/libros.model')

const crearLibro = async () => {
    const libroCreado = await libros.create({
        libro: 'Ejemplo libro 1',
        autor: 'Ejemplo autor 1',
        categoria: ['Array ej 1', 'array ej 2']
    })
}

crearLibro()