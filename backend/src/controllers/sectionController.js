const Section = require('../models/section');
const mongoose = require('mongoose');
const MenuItem = require('../models/menuItem');
require('dotenv').config()

const createSection = async (req, res) => {
  try {
    const { title, link } = req.body;

    //Validación de imagen: Evitamos que el server explote si req.file es undefined
    if (!req.file) {
      return res.status(400).json({ message: "La imagen de la sección es obligatoria" });
    }
    const image = req.file.filename;

    const newSection = new Section({ title, link, image });
    await newSection.save();

    return res.status(201).json(newSection);

  } catch (error) {
    return res.status(500).json({ 
      message: "Error al crear Sección", 
      error: error.message 
    });
  }
};

const getSections = async (req, res) => {
  const showAll = req.query.all === 'true';
  const query = showAll ? {} : { isActive: true };
  const secciones = await Section.find(query);
  res.json(secciones);
};

const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link } = req.body;
    
    let updateData = { title, link };

    // Si viene imagen nueva (req.file existe), es porque Multer procesó una foto nueva
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedSection = await Section.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSection) {
      return res.status(404).json({ message: "Sección no encontrada" });
    }

    res.json({ message: "Sección actualizada con éxito", data: updatedSection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Verificamos si hay productos activos en esta sección
    // Usamos countDocuments para ser eficientes (no traemos todos los datos, solo el número)
    const activeProducts = await MenuItem.countDocuments({ 
      section: id, 
      isActive: true 
    });

    if (activeProducts > 0) {
      return res.status(400).json({ 
        message: `No se puede borrar: esta sección tiene ${activeProducts} productos activos.` 
      });
    }

    // 2. Procedemos al borrado lógico
    // IMPORTANTE: Asignamos el resultado a una constante para poder validarla
    const sectionToDisable = await Section.findByIdAndUpdate(
      id, 
      { isActive: false }, 
      { new: true } // Esto devuelve el documento ya actualizado
    );
    
    // Si el ID no existía en la base de datos
    if (!sectionToDisable) {
      return res.status(404).json({ message: "Sección no encontrada" });
    }
    
    res.json({ message: "Sección desactivada con éxito (borrado lógico)" });

  } catch (error) {
    console.error("Error en deleteSection:", error);
    res.status(500).json({ 
      message: "Error interno del servidor", 
      error: error.message 
    });
  }
};

const restoreSection = async (req, res) => {
  try {
    const { id } = req.params;
    const restored = await Section.findByIdAndUpdate(id, { isActive: true }, { new: true });
    
    if (!restored) return res.status(404).json({ message: "No se encontró" });
    
    res.json({ message: "Sección restaurada con éxito", data: restored });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createSection,
    getSections,
    updateSection,
    deleteSection,
    restoreSection
}