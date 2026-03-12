const mongoose = require('mongoose')
require('dotenv').config()

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conectado a MongoDB')
    } catch (error) {
        console.log('Error en conectar con MongoDB: ', error.message)
        // Si no hay conexión, matamos el proceso para que no intente seguir corriendo sin la base de datos
        process.exit(1);
    }
}

module.exports = conectarDB