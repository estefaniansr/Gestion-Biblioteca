const categoriasRepository= require ('../repository/categorias.repository')
exports.traerTodasCategoriasService = async () =>{
    try {
    console.log('SERVICE - traerTodasCategoriasService')
    return await categoriasRepository.traerTodasCategoriasRepository()    
    } catch (error) {
        console.log("ERROR SERVICE - traerTodasCategoriasService")
        throw Error("ERROR SERVICE - traerTodasCategoriasService")
    }
}
exports.editarCategoriaService = async (id,datos)=>{
try {
    console.log(`Service editarCategoriaService`)
    return await categoriasRepository.EditarCategoriaRepository(id,datos)
} catch (error) {
    console.log(`Error en editarCategoriaService ${error}`)
}
}
exports.crearCategoriaService = async (datos)=>{
    try {
         console.log(`Service crearCategoriaService`)
         const nuevaCategoria= await categoriasRepository.crearCategoriaRepository(datos)
         return JSON.stringify(nuevaCategoria)
    } catch (error) {
            console.error('ERROR en Service crearCategoriaService')
        console.error(error)
    }
}
exports.eliminarCategoriaService = async (id)=>{
    try {
        const categoriaEliminada= await categoriasRepository.eliminarCategoriaRepository(id)
        return JSON.stringify(categoriaEliminada)
    } catch (error) {
         console.error('ERROR en Service crearCategoriaService')
        console.error(error)
    }
}
exports.buscarCategoriaService =async (input) =>{
    try {
        const categoriaEncontrada= await categoriasRepository.buscarCategoriaRepository(input)
        return categoriaEncontrada
    } catch (error) {
        console.error('ERROR en Service BuscarCategoriaService')
        console.error(error)
    }
}