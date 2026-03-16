import { useState } from "react";
import styles from "./addMenuItem.module.css";
import Select from "react-select";

const AddMenuItem = ({ onClose, onSave, secciones, itemToEdit }) => {
  const isEditing = !!itemToEdit;

  // 1. Mapeamos las opciones del select
  const sectionOptions = secciones.map((sec) => ({
    value: sec._id,
    label: sec.title,
  }));

  // 2. Inicializamos el estado con los datos de itemToEdit si existen
  const [formData, setFormData] = useState({
    nombre: itemToEdit ? itemToEdit.name : "",
    precio: itemToEdit ? itemToEdit.price : "",
    seccion: itemToEdit ? itemToEdit.section?._id || itemToEdit.section : "",
    // Si editamos, usamos los ingredientes de la DB. Si es nuevo, uno vacío.
    ingredientes: itemToEdit ? itemToEdit.ingredients : [""],
    imagen: null,
  });

  const [errors, setErrors] = useState({});

  const handleSectionChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      seccion: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setFormData((prev) => ({ ...prev, imagen: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredientes];
    newIngredients[index] = value;
    setFormData((prev) => ({ ...prev, ingredientes: newIngredients }));
  };

  const handleIngredientKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredientes: [...prev.ingredientes, ""],
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredientes.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, ingredientes: newIngredients }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.precio || Number(formData.precio) <= 0)
      newErrors.precio = "Ingresa un precio válido";
    if (!formData.seccion) newErrors.seccion = "Selecciona una sección";

    const ingredientesLimpios = formData.ingredientes.filter(
      (ing) => ing.trim() !== "",
    );
    if (ingredientesLimpios.length === 0)
      newErrors.ingredientes = "Agrega al menos un ingrediente";

    // Al igual que en secciones, la imagen solo es obligatoria si es un item NUEVO
    if (!isEditing && !formData.imagen) {
      newErrors.imagen = "Debes subir una imagen";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave({ ...formData, ingredientes: ingredientesLimpios });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>{isEditing ? "Editar Producto" : "Nuevo Item"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? styles.errorInput : ""}
              />
              {errors.nombre && (
                <span className={styles.errorText}>{errors.nombre}</span>
              )}
            </div>

            <div className={styles.field}>
              <label>Precio (ARS)</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                className={errors.precio ? styles.errorInput : ""}
              />
              {errors.precio && (
                <span className={styles.errorText}>{errors.precio}</span>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label>Sección</label>
            <div className={styles.selectWrapper}>
              <Select
                options={sectionOptions}
                value={
                  sectionOptions.find(
                    (opt) => opt.value === formData.seccion,
                  ) || null
                }
                onChange={handleSectionChange}
                placeholder="Seleccionar sección..."
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  control: (base) => ({
                    ...base,
                    border: errors.seccion
                      ? "2px solid #ef4444"
                      : "2px solid #f2f2f2",
                  }),
                }}
              />
            </div>
            {errors.seccion && (
              <span className={styles.errorText}>{errors.seccion}</span>
            )}
          </div>

          <div className={styles.field}>
            <label>Ingredientes</label>
            <div className={styles.ingredientsContainer}>
              {formData.ingredientes.map((ing, index) => (
                <div key={index} className={styles.ingredientRow}>
                  <input
                    type="text"
                    value={ing}
                    className={errors.ingredientes ? styles.errorInput : ""}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    onKeyDown={handleIngredientKeyDown}
                    placeholder={`Ingrediente #${index + 1}`}
                    autoFocus={
                      index === formData.ingredientes.length - 1 && index !== 0
                    }
                  />
                  {formData.ingredientes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className={styles.removeBtn}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.addIngBtn}
              onClick={addIngredient}
            >
              + Agregar ingrediente
            </button>

            {errors.ingredientes && (
              <span className={styles.errorText}>{errors.ingredientes}</span>
            )}
          </div>

          <div className={styles.field}>
            <label>{isEditing ? "Cambiar Imagen (opcional)" : "Imagen"}</label>
            <div className={styles.fileInput}>
              <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleChange}
              />
              <span>
                {formData.imagen
                  ? formData.imagen.name
                  : isEditing
                    ? "Dejar actual"
                    : "Subir foto"}
              </span>
            </div>
            {errors.imagen && (
              <span className={styles.errorText}>{errors.imagen}</span>
            )}
          </div>

          <div className={styles.formSpacer}></div>
          <footer className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.saveBtn}>
              {isEditing ? "Guardar Cambios" : "Guardar"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AddMenuItem;
