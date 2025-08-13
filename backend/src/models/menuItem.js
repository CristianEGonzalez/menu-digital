const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definimos el esquema del modelo
const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true // Elimina espacios en blanco al inicio y al final
  },
  photo: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Asegura que el precio no sea negativo
  },
  ingredients: [
    {
      type: String
    }
  ],
  // Referencia a la colección 'secciones'
  seccion: {
    type: Schema.Types.ObjectId,
    ref: 'Seccion', // Nombre de tu modelo para las secciones
    required: true
  }
});

// Creamos y exportamos el modelo
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;