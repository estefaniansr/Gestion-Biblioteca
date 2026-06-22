const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const HOST = process.env.HOST

const PORT = process.env.PORT

const {routerUsuarios} = require('./router/usuarios.router')



app.use(cors())

app.use('/usuarios', routerUsuarios)


const { routerLibros } = require('./router/libros.router')

app.use('/libros', routerLibros)

// categorias
const { routerCategorias } = require('./router/categorias.router')
app.use('/categorias', routerCategorias)

// prestamos
const { routerPrestamos } = require('./router/prestamos.router')
app.use('/prestamos', routerPrestamos)

// server
app.get('/', (req, res) => {
    res.status(200)
    res.send(`<h1 style="color: green">El servidor esta funcionando, por ahora</h1>`)
})

app.listen(PORT, HOST, (req, res) => {
    console.log(`Servidor express corriendo en http://${HOST}:${PORT}`)
})