const express = require('express')
const conectarDB = require('./config/db')
const redisClient = require('./config/redisClient')

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.json())
// app.use('/users', require('./routes/userRoutes'));

// Conexión a MongoDB
conectarDB()

//Conexión a Redis
redisClient.connect()
    .then(() => console.log('Conectado a Redis'))
    .catch(console.error)

app.listen(PORT, ()=>{
    console.log(`Aplicación corriendo en el puerto: ${PORT}`)
    console.log('Documentación en http://localhost:3000/api-docs')
})