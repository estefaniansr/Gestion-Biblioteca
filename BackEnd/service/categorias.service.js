
const categoriasRepository = require('../repository/categorias.repository')
exports.traerTodasCategoriasService = async () => {
    try {
        console.log('SERVICE - traerTodasCategoriasService')
        return await categoriasRepository.traerTodasCategoriasRepository()

    } catch (error) {
        console.log("ERROR SERVICE - traerTodasCategoriasService")
        throw Error("ERROR SERVICE - traerTodasCategoriasService")
    }

}
exports.editarCategoriaService = async (id, datos) => {
    try {
        console.log(`Service editarCategoriaService`)
        if (datos.nombre) {
            datos.nombre = datos.nombre.trim()
        }
        if (datos.nombre === '') {
            throw new Error('El nombre no puede estar vacío')
        }
        if (datos.descripcion) {
            datos.descripcion = datos.descripcion.trim()
        }
        return await categoriasRepository.editarCategoriaRepository(id, datos)
    } catch (error) {
        console.log(`Error en editarCategoriaService ${error}`)
    }
}
exports.crearCategoriaService = async (datos) => {
    try {
        if (!datos.nombre || datos.nombre.trim() === '') { //si viene vacio da error
            throw new Error('El nombre de la categoría es obligatorio')
        }
        datos.nombre = datos.nombre.trim() //elimina espacios extras
        datos.descripcion = datos.descripcion?.trim() || '' //si no viene descripcion asignar vacio 
        const categoriaExistente = await categoriasRepository.buscarCategoriaRepository(datos.nombre)//verificar si existe categoria no ese nombre
        if (categoriaExistente.length > 0) {
            throw new Error(`La categoría ${datos.nombre} ya existe`)
        }
        console.log(`Service crearCategoriaService`)
        const nuevaCategoria = await categoriasRepository.crearCategoriaRepository(datos)
        return JSON.stringify(nuevaCategoria)
    } catch (error) {
        console.error('ERROR en Service crearCategoriaService')
        console.error(error)
    }
}
exports.eliminarCategoriaService = async (id) => {
    try {
        const categoriaEliminada = await categoriasRepository.eliminarCategoriaRepository(id)
        return JSON.stringify(categoriaEliminada)
    } catch (error) {
        console.error('ERROR en Service crearCategoriaService')
        console.error(error)
    }
}
exports.buscarCategoriaService = async (input) => {
    try {
        const categoriaEncontrada = await categoriasRepository.buscarCategoriaRepository(input)
        return categoriaEncontrada
    } catch (error) {
        console.error('ERROR en Service BuscarCategoriaService')
        console.error(error)
    }

}