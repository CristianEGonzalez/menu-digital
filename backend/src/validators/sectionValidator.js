const Joi = require('joi');

const sectionSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'El título de la sección no puede estar vacío',
      'string.min': 'El título debe tener al menos 3 caracteres',
      'any.required': 'El título es obligatorio'
    }),

  link: Joi.string()
    .pattern(/^[a-z0-9-]+$/) // Solo letras minúsculas, números y guiones
    .required()
    .messages({
      'string.pattern.base': 'El link solo puede contener letras minúsculas, números y guiones (sin espacios)',
      'any.required': 'El link/slug es obligatorio'
    }),

  // La imagen la marcamos como opcional aquí porque Multer la maneja aparte
  // y en el PUT (edición) puede que no mandemos una nueva.
  image: Joi.any().optional(),
  
  // isActive no suele venir del front en el body de creación/edición,
  // pero lo permitimos por si acaso.
  isActive: Joi.boolean().optional()
});

module.exports = { sectionSchema };