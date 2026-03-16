import { useState } from 'react';
import styles from './addSection.module.css';

const AddSection = ({ onClose, onSave, itemToEdit }) => {
  // Inicializamos el estado. 
  // Si itemToEdit existe, mapeamos los campos de la DB (title, link) a los del formulario (titulo, link)
  const [formData, setFormData] = useState({
    titulo: itemToEdit ? itemToEdit.title : '',
    link: itemToEdit ? itemToEdit.link : '',
    imagen: null
  });

  const [errors, setErrors] = useState({});
  const isEditing = !!itemToEdit; // Booleano para saber si estamos editando

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imagen") {
      setFormData(prev => ({
        ...prev,
        imagen: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio";
    }

    if (!formData.link.trim()) {
      newErrors.link = "El slug es obligatorio";
    }

    // Validación de imagen: solo es obligatoria si NO estamos editando.
    // Si estamos editando y no sube nada, el backend mantendrá la imagen vieja.
    if (!isEditing && !formData.imagen) {
      newErrors.imagen = "Debes subir una imagen";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>{isEditing ? "Editar Sección" : "Nueva Sección"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </header>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label>Título de la Sección</label>
            <input
              type="text"
              name="titulo"
              placeholder="Ej: Postres"
              value={formData.titulo}
              onChange={handleChange}
              className={errors.titulo ? styles.errorInput : ""}
            />
            {errors.titulo && (
              <span className={styles.errorText}>{errors.titulo}</span>
            )}
          </div>

          <div className={styles.field}>
            <label>Slug / Link (URL)</label>
            <input
              type="text"
              name="link"
              placeholder="ej: postres"
              value={formData.link}
              onChange={handleChange}
              className={errors.link ? styles.errorInput : ""}
            />
            {errors.link && (
              <span className={styles.errorText}>{errors.link}</span>
            )}
          </div>

          <div className={styles.field}>
            <label>
              {isEditing ? "Cambiar Banner (opcional)" : "Imagen del Banner"}
            </label>
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
                    ? "Dejar imagen actual" 
                    : "Haz clic para subir el banner"}
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
            <button
              type="submit"
              className={styles.saveBtn}
            >
              {isEditing ? "Guardar Cambios" : "Crear Sección"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AddSection;