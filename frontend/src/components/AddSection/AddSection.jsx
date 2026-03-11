import { useState } from 'react';
import styles from './addSection.module.css';

const AddSection = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    link: '',
    imagen: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>Nueva Sección del Menú</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Título de la Sección</label>
            <input 
              type="text" 
              name="titulo" 
              placeholder="Ej: Postres" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.field}>
            <label>Slug / Link (URL)</label>
            <input 
              type="text" 
              name="link" 
              placeholder="ej: postres" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.field}>
            <label>Imagen del Banner</label>
            <div className={styles.fileInput}>
              <input type="file" accept="image/*" />
              <span>Haz clic para subir el banner (.jpg / .png)</span>
            </div>
          </div>

          <footer className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
            <button type="submit" className={styles.saveBtn}>Crear Sección</button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AddSection;