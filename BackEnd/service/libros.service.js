const librosRepository = require('../repository/libros.repository')

exports.obtenerLibrosService = async () => { // exporta funcion asyncronica

    try { // manejo err
        console.log('Service traerTodosUsuariosService')
        let libros = await librosRepository.obtenerLibrosRepository() // espera respuesta y ejecuta obtenerLibrosRepository
        return JSON.stringify(libros) // JSON.stringify -> transfmra en objeto a json
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
        console.log('datos: ', datos)
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