import { useEffect } from "react";
import styles from "./alertModal.module.css";

const ICONS = {
  success: "✅",
  error: "🚫",
  warning: "⚠️",
  info: "ℹ️",
};

const AlertModal = ({ isOpen, onClose, title, message, type = "error" }) => {
  if (!isOpen) return null;

  const icon = ICONS[type] || ICONS.error;

  // Auto-cierre para los mensajes de éxito o info después de 3 segundos
  useEffect(() => {
  if (isOpen && (type === 'success' || type === 'info')) {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 segundos y se va solo
    return () => clearTimeout(timer);
  }
}, [isOpen, type, onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Aplicamos el icono y una clase dinámica para el color */}
        <div className={`${styles.iconContainer} ${styles[type]}`}>{icon}</div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        <button className={styles.closeBtn} onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
