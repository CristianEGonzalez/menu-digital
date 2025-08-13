const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  ingredients: [
    {
      type: String
    }
  ],
  // Referencia a la colección 'secciones'
  section: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: true
  }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;