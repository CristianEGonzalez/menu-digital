const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definimos el esquema del modelo
const sectionSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true, // Asegura que no haya secciones con el mismo nombre
    trim: true
  }
});

// Creamos y exportamos el modelo
const Section = mongoose.model('Section', seccionSchema);
module.exports = Section;