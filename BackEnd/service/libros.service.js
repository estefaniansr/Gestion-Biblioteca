const librosRepository = require('../repository/libros.repository')

exports.obtenerLibrosService = async () => { 

    try {
        console.log('Service traerTodosUsuariosService')
        let libros = await librosRepository.obtenerLibrosRepository()
        return JSON.stringify(libros) 
    }

    catch (err) {
        console.error('ERROR en Service obtenerLibrosService')
        console.error(err)
    }
}

exports.crearLibroService = async (datos) => {
    try {
        console.log("Crear libro service")
        let nuevoLibro = await librosRepository.crearLibroRepository(datos)
        return JSON.stringify(nuevoLibro)
    } catch (err) {
        console.error('ERROR en Service crearLibroService')
        console.error(err)
    }
}

exports.editarLibroService = async (id, datos) => {
    try {
        console.log("Editar libro service")
        let libroEditado = await librosRepository.editarLibroRepository(id, datos)
        return JSON.stringify(libroEditado)
    } catch (e) {
        console.error("Error en el service editarLibroService", e)
    }
}

exports.eliminarLibroService = async (id) => {
    try {
        console.log("Eliminar libro service")
        let libroEliminado = await librosRepository.eliminarLibroRepository(id)
        return JSON.stringify(libroEliminado)
    } catch (err) {
        console.error('ERROR en Service eliminarLibroService')
        console.error(err)
    }
}

exports.buscarLibroService = async (input) => {
    try {
        console.log("Buscar libro service")
        let libroBuscado = await librosRepository.buscarLibroRepository(input)
        return libroBuscado
    } catch (err) {
        console.error('ERROR en Service buscarLibroService')
        console.error(err)
    }
}