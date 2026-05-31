const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')


const app = express()

const HOSTNAME = process.env.HOSTNAME

const PORT = process.env.PORT

const {routerUsuarios} = require('./router/usuarios.router')

app.use(cors())
app.use('/usuarios', routerUsuarios)

app.get('/', (req,res)=>{
    res.status(200)
    res.send(`<h1 style="color: green">El servidor esta funcionando, por ahora</h1>`)
})

app.listen(PORT, HOSTNAME, (req, res)=>{
    console.log(`Servidor express corriendo en http://${HOSTNAME}:${PORT}`)
})