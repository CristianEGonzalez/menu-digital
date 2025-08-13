const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // La carpeta donde se guardarán las imágenes
    cb(null, 'src/uploads/images');
  },
  filename: (req, file, cb) => {
    // Crea un nombre de archivo único con el nombre original del archivo
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;