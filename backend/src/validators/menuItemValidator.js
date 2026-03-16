const Joi = require('joi');

const menuItemSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'El nombre no puede estar vacío',
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'any.required': 'El nombre es obligatorio'
    }),
    
  price: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'El precio debe ser un número',
      'number.positive': 'El precio debe ser mayor a 0',
      'any.required': 'El precio es obligatorio'
    }),
    
  section: Joi.string()
    .required()
    .messages({
      'any.required': 'La sección es obligatoria'
    }),
    
  ingredients: Joi.array()
    .items(Joi.string().trim())
    .min(1)
    .required()
    .messages({
      'array.min': 'Debes agregar al menos un ingrediente',
      'any.required': 'Los ingredientes son obligatorios'
    }),

  // El campo image no lo validamos fuerte aquí porque llega por Multer,
  // pero podemos dejarlo como opcional para que Joi no lo rebote si viene.
  image: Joi.any().optional()
});

module.exports = { menuItemSchema };