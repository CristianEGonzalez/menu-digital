const express = require('express')
const conectarDB = require('./config/db')

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/menuItems', require('./routes/menuItemRoutes'));
app.use('/sections', require('./routes/sectionRoutes'));

// Conexión a MongoDB
conectarDB()


app.listen(PORT, ()=>{
    console.log(`Aplicación corriendo en el puerto: ${PORT}`)
    console.log('Documentación en http://localhost:3000/api-docs')
})