const categoriasService = require('../service/categorias.service')
exports.traerTodasCategoriasController = async (req, res) => {
    try {
        console.log("controller - traerTodasCategoriasController")
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await categoriasService.traerTodasCategoriasService())
    } catch (error) {
        console.log('error en controller - traerTodasCategoriasController' + error)
        res.status(500)
            .send({
                code: 500,
                message: "Error en Error Categorias Controller - traerTodasCategoriasController"
            })
    }
}