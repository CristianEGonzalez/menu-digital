const MenuItem = require("../models/menuItem");
const mongoose = require("mongoose");
const mongooseErrorHandler = require("../utils/mongooseErrorHandler");
const fs = require('fs');
require("dotenv").config();

const createMenuItem = async (req, res) => {
  try {
    const { name, price, ingredients, section } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "La imagen es obligatoria" });
    }
    const image = req.file.filename;

    // Normalización de ingredientes (fixeado de String)
    let ingredientsArray = ingredients;

    if (typeof ingredientsArray === "string") {
      // Si el usuario mandó ingredientes, los separamos. Si está vacío, mandamos array vacío.
      ingredientsArray = ingredientsArray
        ? ingredientsArray.split(",").map((ing) => ing.trim())
        : [];
    }

    const newMenuItem = new MenuItem({
      name,
      image,
      price,
      ingredients: ingredientsArray,
      section,
    });

    await newMenuItem.save();

    return res.status(201).json(newMenuItem);
  } catch (error) {
    console.error("Error en createMenuItem:", error);
    // Si falla la creación borramos la imagen que se subió para no dejar archivos huérfanos
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    // Usamos la utilidad para obtener el mensaje
    const message = mongooseErrorHandler(error);
    const statusCode = error.code === 11000 || error.name === 'ValidationError' ? 400 : 500;
    return res.status(statusCode).json({ message });
  }
};

const getMenuItemList = async (req, res) => {
  try {
    const showAll = req.query.all === "true";
    const query = showAll ? {} : { isActive: true };
    // Usamos populate para traer el nombre de la sección
    const items = await MenuItem.find(query).populate("section");
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    const menuItem = await MenuItem.findById(id);
    return res.status(200).json(menuItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el Menu Item", error });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, section, ingredients } = req.body;

    let updateData = { name, price, section };

    // Procesamos los ingredientes (por si vienen como string o array)
    if (ingredients) {
      updateData.ingredients = Array.isArray(ingredients)
        ? ingredients
        : ingredients.split(",").map((ing) => ing.trim());
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto actualizado con éxito", data: updatedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MenuItem.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ message: "Producto desactivado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const restoreMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Buscamos el producto y traemos los datos de su sección (populate)
    const product = await MenuItem.findById(id).populate("section");

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // 2. Verificamos si la sección está activa, sino bloqueamos la restauración
    if (!product.section || product.section.isActive === false) {
      return res.status(400).json({
        message:
          "No se puede restaurar el producto porque su sección ('" +
          (product.section?.title || "Desconocida") +
          "') está eliminada. Restaurá la sección primero.",
      });
    }

    // 3. Restauramos el producto
    product.isActive = true;
    await product.save();

    res.json({ message: "Producto restaurado con éxito", data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMenuItem,
  getMenuItemList,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
  restoreMenuItem,
};
