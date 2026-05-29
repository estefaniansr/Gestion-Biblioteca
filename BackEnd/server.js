const express = require('express')

const app = express()

const HOSTNAME = '127.0.0.1'

const PORT = 3000

app.get('/', (req,res)=>{
    res.status(200)
    res.send(`<h1>El servidor esta funcionando, por ahora</h1>`)
})

app.listen(PORT, HOSTNAME, (req, res)=>{
    console.log(`Servidor express corriendo en http://${HOSTNAME}:${PORT}`)
})