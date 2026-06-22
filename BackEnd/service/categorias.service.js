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