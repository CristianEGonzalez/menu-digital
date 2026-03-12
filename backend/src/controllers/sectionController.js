const Section = require('../models/section');
const mongoose = require('mongoose');
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

const getSections = async (_, res) => {
  try {
    const sections = await Section.find()
    return res.status(200).json(sections);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener las secciones", error });
  }
}

module.exports = {
    createSection,
    getSections
}