const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    ingredients: [String],

    // Referencia a la colección 'Section'
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section", // Debe coincidir con el nombre del modelo de Secciones
      required: true,
    },
  },
  {
    timestamps: true, // Opcional: agrega createdAt y updatedAt automáticamente
  },
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
