const express = require('express')
const conectarDB = require('./config/db')
const app = express()
const path = require('path');
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/menuItems', require('./routes/menuItemRoutes'));
app.use('/sections', require('./routes/sectionRoutes'));

// Esto le dice a Express que sirva los archivos de la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión a MongoDB
conectarDB()


app.listen(PORT, ()=>{
    console.log(`Aplicación corriendo en el puerto: ${PORT}`)
})