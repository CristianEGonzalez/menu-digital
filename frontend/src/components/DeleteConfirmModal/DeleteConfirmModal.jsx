import styles from './deleteConfirmModal.module.css';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName, type }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconContainer}>
          <span className={styles.warningIcon}>⚠️</span>
        </div>
        <h2 className={styles.title}>¿Estás seguro?</h2>
        <p className={styles.message}>
          Estás a punto de eliminar <strong>{itemName}</strong> de la lista de {type}. 
          Podrás restaurarlo más tarde desde la papelera.
        </p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            No, cancelar
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;