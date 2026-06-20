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
exports.editarCategoriaController = async (req, res) => {
    try {
        const id = req.params.id
        const datos = req.body
        console.log(`editarCategoriaController id ${id} categoriaActualizada ${datos}`)
        const categoria = await categoriasService.editarCategoriaService(id, datos)
        if (!categoria) {
            return res.status(404).send(`No se encuentra una categoria a modificar con el id ${id}`)
        }
        res.status(200).send(JSON.stringify(categoria))
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: "Error al actualizar la categoria"
        })
    }
}
exports.crearCategoriaController = async (req,res) =>{
    try {

        res.setHeader('Content-Type', 'application/json')
        const nuevaCategoria =await categoriasService.crearCategoriaService(req.body)
           res.status(200).send(nuevaCategoria)
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: "error al crear categoría"
        })
    }
    }

exports.eliminarCategoriaController = async (req,res)=>{
    try {
        res.setHeader('Content-Type', 'application/json')
        const id = req.params.id
       res.status(200).send(await categoriasService.eliminarCategoriaService(id))
    } catch (error) {
          res.status(500).send({
            code: 500,
            message: "error al eliminar categoría"
        })
    }
}
exports.buscarCategoriaController = async (req,res) =>{
    try {
        res.setHeader('Content-Type','application/json')
        const { input = ''} = req.query
        const categoriaEncontrada = await categoriasService.buscarCategoriaService(input)
        res.status(200).send(categoriaEncontrada)
    } catch (error) {
         res.status(500).send({
            code: 500,
            message: "error al buscar categoría"
        })
    }
}