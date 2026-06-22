const config = require('./config.js')
const mongoose = require('mongoose')

const dns = require('dns') 

dns.setServers(['8.8.8.8', '1.1.1.1']) 

const URIMONGODB = `mongodb+srv://${config.configDB.user}:${config.configDB.pass}@gestionbiblioteca.c7zdsu6.mongodb.net`


exports.conexionAMongo = async (basedeDatos) => { 
    try { 
        await mongoose.connect(`${URIMONGODB}/${basedeDatos}`)
        console.log(`DB Mongo conectada correctamente`)
    }
    catch (error) {
        console.error('Error al conectarse a MongoDB')
        console.error(error)
        process.exit(1) 
    }
}