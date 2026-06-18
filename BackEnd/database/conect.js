const config = require('./config.js')
const mongoose = require('mongoose')

const dns = require('dns') // permite configurar servidores dns automatciamente

dns.setServers(['8.8.8.8', '1.1.1.1']) // dns publicos, google, cloudfare

const URIMONGODB = `mongodb+srv://${config.configDB.user}:${config.configDB.pass}@gestionbiblioteca.c7zdsu6.mongodb.net`

exports.conexionAMongo = async () => {
    try{
        await mongoose.connect(`${URIMONGODB}/GestionBiblioteca`)
        console.log(`DB Mongo conectada correctamente`)
    }
    catch (error) {
        console.error('Error al conectarse a MongoDB')
        console.error(error)
        process.exit(1) // finaliza la ejecucion con codigo de err 1
    }
}
