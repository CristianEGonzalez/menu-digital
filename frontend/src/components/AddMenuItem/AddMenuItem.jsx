import { useState } from 'react';
import styles from './addMenuItem.module.css';
import { secciones } from '../../data'; // Importamos las secciones para el select

const AddMenuItem = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    seccion: '',
    ingredientes: [''],
    imagen: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredientes];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredientes: newIngredients });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredientes: [...formData.ingredientes, ''] });
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredientes.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredientes: newIngredients });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto a guardar:", formData);
    // Aquí irá la lógica para enviar al backend
    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>Nuevo Item del Menú</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nombre del Producto</label>
              <input 
                type="text" 
                name="nombre" 
                placeholder="Ej: Krusty Burger" 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className={styles.field}>
              <label>Precio (ARS)</label>
              <input 
                type="number" 
                name="precio" 
                placeholder="18000" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Sección</label>
            <select name="seccion" onChange={handleChange} required>
              <option value="">Seleccionar sección...</option>
              {secciones.map((sec, i) => (
                <option key={i} value={sec.titulo}>{sec.titulo}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label>Ingredientes</label>
            {formData.ingredientes.map((ing, index) => (
              <div key={index} className={styles.ingredientRow}>
                <input 
                  type="text" 
                  value={ing} 
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  placeholder={`Ingrediente #${index + 1}`}
                />
                {formData.ingredientes.length > 1 && (
                  <button type="button" onClick={() => removeIngredient(index)}>✕</button>
                )}
              </div>
            ))}
            <button type="button" className={styles.addIngBtn} onClick={addIngredient}>
              + Agregar Ingrediente
            </button>
          </div>

          <div className={styles.field}>
            <label>Imagen del Producto</label>
            <div className={styles.fileInput}>
              <input type="file" accept="image/*" />
              <span>Haz clic para subir foto</span>
            </div>
          </div>

          <footer className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
            <button type="submit" className={styles.saveBtn}>Guardar Producto</button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AddMenuItem;