const mongooseErrorHandler = (error) => {
  // Si es un error de duplicado de MongoDB
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    
    // Mapeamos los nombres técnicos a palabras amigables
    const fieldNames = {
      title: 'título',
      name: 'nombre',
      link: 'link/slug'
    };

    const friendlyField = fieldNames[field] || field;
    return `Ya existe un elemento con ese ${friendlyField}.`;
  }

  // Si es un error de validación de Mongoose (opcional)
  if (error.name === 'ValidationError') {
    return Object.values(error.errors).map(val => val.message).join(', ');
  }

  // Si no sabemos qué es, devolvemos un mensaje genérico
  return "Ocurrió un error inesperado en el servidor.";
};

module.exports = mongooseErrorHandler;