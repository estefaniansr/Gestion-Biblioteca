const dotenv = require('dotenv').config()

const configDB = {
    user:process.env.USERDB,
    pass:process.env.PASSDB,
    dbName:process.env.DBNAME,
    appName:process.env.APPNAME
}

module.exports = { configDB }