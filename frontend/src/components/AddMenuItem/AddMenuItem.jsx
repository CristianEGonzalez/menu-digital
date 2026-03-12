import { useState } from 'react';
import styles from './addMenuItem.module.css';
import { secciones } from '../../data'; 
import Select from 'react-select';

const sectionOptions = secciones.map(sec => ({
  value: sec.titulo,
  label: sec.titulo
}));

const AddMenuItem = ({ onClose, onSave }) => {

  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    seccion: '',
    ingredientes: [''],
    imagen: null
  });

  const [errors, setErrors] = useState({});

  const handleSectionChange = (selectedOption) => {
    setFormData(prev => ({
      ...prev,
      seccion: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imagen') {
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

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredientes];
    newIngredients[index] = value;

    setFormData(prev => ({
      ...prev,
      ingredientes: newIngredients
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredientes: [...prev.ingredientes, '']
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredientes.filter((_, i) => i !== index);

    setFormData(prev => ({
      ...prev,
      ingredientes: newIngredients
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!formData.precio || Number(formData.precio) <= 0) {
      newErrors.precio = "Ingresa un precio válido";
    }

    if (!formData.seccion) {
      newErrors.seccion = "Selecciona una sección";
    }

    const ingredientesLimpios = formData.ingredientes.filter(
      ing => ing.trim() !== ''
    );

    if (ingredientesLimpios.length === 0) {
      newErrors.ingredientes = "Agrega al menos un ingrediente";
    }

    if (!formData.imagen) {
      newErrors.imagen = "Debes subir una imagen";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSave({
      ...formData,
      ingredientes: ingredientesLimpios
    });

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>Nuevo Item</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </header>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nombre</label>

              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                placeholder="Ej: Krusty Burger"
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
                placeholder="18000"
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
                value={sectionOptions.find(opt => opt.value === formData.seccion) || null}
                onChange={handleSectionChange}
                placeholder="Seleccionar sección..."
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 }),
                  control: (base) => ({
                    ...base,
                    border: errors.seccion
                      ? "2px solid #ef4444"
                      : "2px solid #f2f2f2"
                  })
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
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    placeholder={`Ingrediente #${index + 1}`}
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

            {errors.ingredientes && (
              <span className={styles.errorText}>{errors.ingredientes}</span>
            )}

            <button
              type="button"
              className={styles.addIngBtn}
              onClick={addIngredient}
            >
              + Agregar ingrediente
            </button>
          </div>

          <div className={styles.field}>
            <label>Imagen</label>

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
                  : "Haz clic para subir foto"}
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
              Guardar
            </button>
          </footer>

        </form>
      </div>
    </div>
  );
};

export default AddMenuItem;