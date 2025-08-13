const Section = require('../models/section');
const mongoose = require('mongoose');
require('dotenv').config()

const createSection = async (req, res) => {
  try {
    const { title, link, image } = req.body
    const newSection = new Section({ title, link, image });
    await newSection.save();

    return res.status(201).json(newSection);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear Sección", error });
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