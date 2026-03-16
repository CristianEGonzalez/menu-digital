const fs = require('fs');

const validateRequest = (schema) => {
  return (req, res, next) => {
    // Solo normalizamos ingredientes si el campo existe en el body.
    // De lo contrario, se lo agregamos a las Secciones y Joi explota.
    if (req.body.ingredients !== undefined) {
      if (!Array.isArray(req.body.ingredients)) {
        req.body.ingredients = [req.body.ingredients];
      }
      // Limpiamos strings vacíos
      req.body.ingredients = req.body.ingredients
        .map(ing => (typeof ing === 'string' ? ing.trim() : ing))
        .filter(ing => ing !== "");
    }

    // 2. VALIDACIÓN DE JOI
    const { error } = schema.validate(req.body, { 
      abortEarly: false, 
      convert: true 
    });

    if (error) {
      // LIMPIEZA DE ARCHIVOS HUÉRFANOS
      // Si Joi rebota la petición pero Multer ya subió una foto, la borramos
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
          console.log(`Archivo borrado por error de validación: ${req.file.filename}`);
        } catch (err) {
          console.error("Error al intentar borrar el archivo huérfano:", err);
        }
      }

      const errorMessages = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({ message: errorMessages });
    }

    next();
  };
};

module.exports = validateRequest;