import React, { useState } from "react";
import styles from "./ProductForm.module.css";
import { secciones } from '../../data';

const ProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    ingredients: [""],
    section: "",
    image: null,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...productData.ingredients];
    newIngredients[index] = event.target.value;
    setProductData({ ...productData, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    setProductData({
      ...productData,
      ingredients: [...productData.ingredients, ""],
    });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...productData.ingredients];
    newIngredients.splice(index, 1);
    setProductData({ ...productData, ingredients: newIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData
    const formData = new FormData();
    formData.append("name", productData.name);
    // Filtrar ingredientes vacíos y añadirlos
    productData.ingredients
      .filter((ing) => ing.trim() !== "")
      .forEach((ing) => {
        formData.append("ingredients", ing);
      });
    formData.append("section", productData.section);

    // Solo si hay una imagen, la agregamos
    if (productData.image) {
      formData.append("image", productData.image);
    }

    try {
      // Realizar la llamada a la API
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData, // FormData se envía directamente
      });

      if (!response.ok) {
        throw new Error("Error al cargar el producto");
      }

      const result = await response.json();
      console.log("Producto cargado con éxito:", result);
      alert("Producto cargado con éxito!");

      // Opcional: limpiar el formulario después del éxito
      setProductData({
        name: "",
        ingredients: [""],
        section: "",
        image: null,
      });
    } catch (error) {
      console.error("Hubo un error:", error);
      alert("Hubo un error al cargar el producto.");
    }
  };

  return (
    <div className={styles.productFormContainer}>
      <form onSubmit={handleSubmit} className={styles.productForm}>
        <h2 className={styles.formTitle}>Cargar Nuevo Producto</h2>

        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre del Producto:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Ingredientes:</label>
          {productData.ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientInputGroup}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder={`Ingrediente ${index + 1}`}
              />
              {productData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className={styles.removeButton}
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className={styles.addButton}
          >
            + Añadir Ingrediente
          </button>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="section">Sección:</label>
          <select
            id="section"
            name="section"
            value={productData.section}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una sección</option>
            {secciones.map((seccion, index) => (
              <option key={index} value={seccion.titulo}>
                {seccion.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Foto del Producto:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Cargar Producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
