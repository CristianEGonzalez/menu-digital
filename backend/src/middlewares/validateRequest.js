const validateRequest = (schema) => {
  return (req, res, next) => {
    // IMPORTANTE: Como usamos Multer, los datos llegan en req.body
    // pero a veces los arrays (como ingredientes) llegan como strings.
    // Aquí es donde se podría hacer un pequeño ajuste si Joi falla con los arrays.

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({ message: errorMessages });
    }

    next(); 
  };
};

module.exports = validateRequest;