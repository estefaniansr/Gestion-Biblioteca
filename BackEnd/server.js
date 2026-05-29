const express = require('express')
const dotenv = require('dotenv').config()

const { traerTodosUsuarios } = require('./repository/usuarios.repository')

const app = express()

const HOSTNAME = process.env.HOSTNAME

const PORT = process.env.PORT

app.get('/', (req,res)=>{
    res.status(200)
    res.send(`<h1>El servidor esta funcionando, por ahora</h1>`)
})

app.get('/probando', async (req,res)=>{
    res.status(200)
    let usuarios = JSON.stringify(await traerTodosUsuarios())
    res.setHeader('Content-Type', 'application/json')
    res.send(usuarios)
})

app.listen(PORT, HOSTNAME, (req, res)=>{
    console.log(`Servidor express corriendo en http://${HOSTNAME}:${PORT}`)
})